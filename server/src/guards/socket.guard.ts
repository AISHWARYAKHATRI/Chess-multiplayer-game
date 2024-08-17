import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/modules/users/entities/users.entity';
import { USER } from 'src/shared/constants/response-messages';
import { decodeToken } from 'src/utils/jwt.utils';

export class WebSocketGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth.token;

    if (!token) {
      // throw new UnauthorizedException('Authorization token not found');
      return;
    }

    const { id } = decodeToken(token);
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new UnauthorizedException(USER.ErrorMessages.USER_NOT_FOUND);
    }

    const { ...userData } = user;

    client['user'] = userData as User;

    return true;
  }
}
