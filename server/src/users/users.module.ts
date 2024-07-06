import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { User } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Secret for JWT signing
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [JwtModule],
})
export class UsersModule {}
