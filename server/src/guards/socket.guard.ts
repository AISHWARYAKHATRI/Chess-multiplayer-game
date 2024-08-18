import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/modules/users/entities/users.entity';
import { decodeToken } from 'src/utils/jwt.utils';
import { GAME_EVENTS } from 'src/common/game.enum';

@Injectable()
export class WebSocketGuard implements CanActivate {
  private readonly logger = new Logger(WebSocketGuard.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    try {
      const token = client.handshake.auth.token;

      if (!token) {
        this.sendUnauthorizedResponse(client, 'No token provided');
        return false;
      }

      const { id } = decodeToken(token);

      if (!id) {
        this.sendUnauthorizedResponse(client, 'Invalid token');
        return false;
      }

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        this.sendUnauthorizedResponse(client, `No user found with id ${id}`);
        return false;
      }

      client['user'] = user;
      return true;
    } catch (error) {
      this.logger.error('Unexpected error in WebSocketGuard', error.stack);
      this.sendUnauthorizedResponse(client, 'Unauthorized');
      return false;
    }
  }

  private sendUnauthorizedResponse(client: any, message: string) {
    this.logger.warn(message);
    client.emit(GAME_EVENTS.UNAUTHORIZED, { status: 401, message });

    // Delay disconnection to ensure the message is sent
    setTimeout(() => {
      client.disconnect(true);
    }, 100); // Adjust the delay as needed
  }
}
