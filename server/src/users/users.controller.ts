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
  async register(@Body() userData: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.createNewUser(userData);

      if (!newUser) {
        throw new HttpException(
          {
            status: 'fail',
            message: USER.ErrorMessages.USER_CREATION_FAILED,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return res
        .status(201)
        .json({ message: USER.SuccessMessages.USER_CREATION_SUCCESS });
    } catch (error) {
      throw new HttpException(
        {
          status: 'fail',
          message: USER.ErrorMessages.USER_UNEXPECTED_ERROR,
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
