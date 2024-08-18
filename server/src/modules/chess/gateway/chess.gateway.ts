import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';

import { MoveDto } from '../dto/game.dto';
import { ChessService } from '../chess.service';
import { User } from 'src/modules/users/entities/users.entity';
import { GAME_EVENTS } from 'src/common/game.enum';
import { WebSocketGuard } from 'src/guards/socket.guard';
import { Move } from 'chess.js';

// Adds the user connecting to the socket
interface CustomSocket extends Socket {
  user?: User;
}

@UseGuards(WebSocketGuard)
@WebSocketGateway()
export class ChessGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chessService: ChessService) {}

  @SubscribeMessage(GAME_EVENTS.CONNECT)
  async handleConnection(client: CustomSocket) {
    try {
      client.emit(GAME_EVENTS.CONNECTED, { message: 'Connection Successful' });
    } catch (error) {
      client.emit(GAME_EVENTS.EXCEPTION, error.message);
      client.disconnect();
    }
  }

  @SubscribeMessage(GAME_EVENTS.CREATE_GAME)
  async handleCreateGame(client: CustomSocket) {
    try {
      const game = await this.chessService.createGame({
        player_white: client?.user?.id,
      });
      this.server.emit(GAME_EVENTS.GAME_CREATED, game);
    } catch (error) {
      client.emit(GAME_EVENTS.EXCEPTION, error.message);
    }
  }

  @SubscribeMessage(GAME_EVENTS.JOIN_GAME)
  async handleJoinGame(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() data,
  ) {
    try {
      const { gameId } = JSON.parse(data);

      const result = await this.chessService.joinGame(gameId, client.user.id);
      if (result.message === 'You have successfully joined the game.') {
        client.emit(GAME_EVENTS.GAME_JOINED, result.game);
      } else {
        client.emit(GAME_EVENTS.JOIN_FAILED, result.message);
      }
    } catch (error) {
      client.emit(GAME_EVENTS.EXCEPTION, error.message);
    }
  }

  @SubscribeMessage(GAME_EVENTS.MOVE)
  async handleMove(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() move,
  ) {
    try {
      const formattedMove = JSON.parse(move);
      const result = await this.chessService.processMove(formattedMove);
      this.server.emit(GAME_EVENTS.MOVE_MADE, result);
    } catch (error) {
      client.emit(GAME_EVENTS.EXCEPTION, error.message);
    }
  }

  @SubscribeMessage(GAME_EVENTS.DISCONNECT)
  handleDisconnect(client: CustomSocket) {
    try {
      client.disconnect();
    } catch (error) {
      client.emit(GAME_EVENTS.EXCEPTION, error.message);
    }
  }
}
