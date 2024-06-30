import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/users.dto';
import { USER } from 'src/shared/constants/response-messages';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createNewUser(user: CreateUserDto) {
    const { password, email, username } = user;

    const existingEmail = await this.userRepository.findOne({
      where: { email: email },
    });

    // check if email already exists
    if (existingEmail) {
      throw new HttpException(
        USER.ErrorMessages.USER_EMAIL_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if the username already exists
    const existingUsername = await this.userRepository.findOne({
      where: { username: username },
    });

    if (existingUsername) {
      throw new HttpException(
        USER.ErrorMessages.USERNAME_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return {
      status: HttpStatus.CREATED,
      message: 'User registered',
    };
  }
}
