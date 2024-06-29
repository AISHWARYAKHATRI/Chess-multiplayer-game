import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createNewUser(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return this.userRepository.save(newUser);
    } catch (error) {
      return error;
    }
  }
}
