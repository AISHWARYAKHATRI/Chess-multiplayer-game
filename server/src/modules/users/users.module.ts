import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from 'src/config/app.config';
import { Game } from '../chess/entities/chess.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Game]),
    JwtModule.register({
      secret: appConfig.jwtSecretKey, // Secret for JWT signing
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
