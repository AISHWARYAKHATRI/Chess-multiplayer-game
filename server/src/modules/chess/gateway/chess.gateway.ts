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

import { ChessService } from '../chess.service';
import { User } from 'src/modules/users/entities/users.entity';
import { GAME_EVENTS } from 'src/common/game.enum';
import { WebSocketGuard } from 'src/guards/socket.guard';

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

  // connection
  @SubscribeMessage(GAME_EVENTS.CONNECT)
  async handleConnection(client: CustomSocket) {
    try {
      client.emit(GAME_EVENTS.CONNECTED, { message: 'Connection Successful' });
    } catch (error) {
      client.emit(GAME_EVENTS.EXCEPTION, error.message);
      client.disconnect();
    }
  }

  // creation of game
  @SubscribeMessage(GAME_EVENTS.CREATE_GAME)
  async handleCreateGame(client: CustomSocket) {
    try {
      const game = await this.chessService.createGame({
        player_white: client?.user?.id,
      });
      this.server.emit(game.event, game);
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
      client.emit(result.event, result);
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
