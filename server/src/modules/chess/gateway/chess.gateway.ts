import { InjectRepository } from '@nestjs/typeorm';
// Websocket gateway logic
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';

import { MoveDto } from '../dto/move.dto';
import { ChessService } from '../chess.service';
import { User } from 'src/modules/users/entities/users.entity';
import { UnauthorizedException } from '@nestjs/common';
import { decodeToken } from 'src/utils/jwt.utils';
import { USER } from 'src/shared/constants/response-messages';

// Decorate the class as a WebSocket gateway
@WebSocketGateway()
export class ChessGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // Decorate a property with @WebSocketServer() to access the WebSocket server instance
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly chessService: ChessService,
  ) {}

  // Inject ChessService to handle business logic related to chess moves
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;

    try {
      if (!token) {
        throw new UnauthorizedException();
      }

      const { id } = decodeToken(token);
      const user = await this.userRepository.findOne({ where: { id: id } });

      if (!user) {
        throw new UnauthorizedException(USER.ErrorMessages.USER_NOT_FOUND);
      }
      console.log(`Client connected: ${client.id}`);
    } catch (error) {
      client.emit('exception', error.message);
      client.disconnect();
    }
  }

  // Implement OnGatewayDisconnect interface method to handle client disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    client.disconnect();
  }

  // Decorate a method with @SubscribeMessage() to handle incoming messages with a specific event name ('move' in this case)
  @SubscribeMessage('move')
  handleMove(@MessageBody() move: MoveDto): void {
    const result = this.chessService.processMove(move);
    this.server.emit('move', result);
  }
}
