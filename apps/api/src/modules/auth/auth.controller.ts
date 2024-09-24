import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, Public } from '../../shared/decorators';
import { RtGuard } from '../../shared/guards';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() authDto: SignUpDto): Promise<Tokens> {
    return this.auth.signup(authDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.auth.signin(signInDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.auth.refreshToken(userId, refreshToken);
  }
}
