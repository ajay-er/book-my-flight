import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
  ) {}

  async signup(authDto: SignUpDto): Promise<Tokens> {
    const existingUser = await this.userService.findByEmail(authDto.email);

    if (existingUser) {
      throw new ConflictException('Email is already registered.');
    }
    const hash = await argon2.hash(authDto.password);

    const newUser = await this.userService.create({
      ...authDto,
      password: hash,
    });

    const tokens = await this.generateToken(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, rt: string) {
    const hashedRt = await argon2.hash(rt);
    await this.userService.update(userId, { hashedRt });
  }

  async signin(authDto: SignInDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(authDto.email);
    if (!user) throw new ForbiddenException('Access denied');
    const passwordMatch = await argon2.verify(user.password, authDto.password);
    if (!passwordMatch) throw new BadRequestException('Invalid credentials');
    const tokens = await this.generateToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    let rtMatchIndex = -1;
    for (let i = 0; i < user.hashedRt.length; i++) {
      const isMatch = await argon2.verify(user.hashedRt[i], rt);
      if (isMatch) {
        rtMatchIndex = i;
        break;
      }
    }

    if (rtMatchIndex === -1) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.generateToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async generateToken(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: 60 * 15 },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);
    return { access_token: at, refresh_token: rt };
  }
}
