import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './shared/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards';
import { FlightModule } from './modules/flight/flight.module';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URL),
    UsersModule,
    AuthModule,
    FlightModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
