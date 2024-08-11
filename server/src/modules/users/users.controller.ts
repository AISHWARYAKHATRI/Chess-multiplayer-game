import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import * as geoip from 'geoip-lite';

import { CreateUserDto, LoginUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() userData: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const ipAddress =
        (req as any)?.ip || (req as any)?.connection?.remoteAddress;

      const geo = geoip.lookup(ipAddress);

      const country = geo?.country();

      console.log(
        country,
        (req as any)?.ip || (req as any)?.connection?.remoteAddress,
      );

      const newUser = await this.usersService.createNewUser({
        ...userData,
        country,
      });
      return res.status(201).send({ data: newUser });
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() userData: LoginUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.login(userData);
      return res.status(200).send({ data: user });
    } catch (error) {
      throw error;
    }
  }
}
