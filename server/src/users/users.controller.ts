import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { USER } from 'src/shared/constants/response-messages';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return await this.usersService.createNewUser(userData);
  }
}
