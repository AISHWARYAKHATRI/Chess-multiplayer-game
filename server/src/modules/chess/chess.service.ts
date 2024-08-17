import { Injectable } from '@nestjs/common';
import { GameDto } from './dto/game.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Game } from './entities/chess.entity';
import { GAME_STATUS } from 'src/common/game.enum';
import { User } from '../users/entities/users.entity';

@Injectable()
export class ChessService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // private games: { [key: string]: GameState } = {};

  // processMove(move: MoveDto): GameState {
  //   // Process the chess move here and update the game state
  //   const gameId = move.gameId;
  //   const game = this.games[gameId] || this.createGame(gameId);

  //   // Update the game state with the new move
  //   // game.board = updateBoard(game.board, move);
  //   // game.turn = toggleTurn(game.turn);

  //   this.games[gameId] = game;
  //   return game;
  // }

  async createGame(newGame: GameDto) {
    const game = this.gameRepository.create(newGame);
    await this.gameRepository.save(game);
    return game.id;
  }

  async joinGame(gameId: number, userId: number) {
    
    const createdGame = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['player_white', 'player_black'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!createdGame) {
      return {
        message: 'Game not found.',
      };
    }

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    if (createdGame.status !== GAME_STATUS.WAITING_FOR_PLAYER) {
      return {
        message: 'You cannot join this game.',
      };
    }

    console.log(createdGame, createdGame?.player_white?.id, userId);

    // No two same players are allowed to join
    if (
      createdGame.player_white?.id === userId ||
      createdGame.player_black?.id === userId
    ) {
      return {
        message: 'You have already joined this game',
      };
    }

    if (!createdGame.player_white) {
      createdGame.player_white = user;
    } else if (!createdGame.player_black) {
      createdGame.player_black = user;
    } else {
      return {
        message: 'The game is already full',
      };
    }

    if (createdGame.player_black && createdGame.player_white) {
      createdGame.status = GAME_STATUS.ONGOING;
    }

    await this.gameRepository.save(createdGame);

    return {
      message: 'You have successfully joined the game.',
      game: createdGame,
    };
  }
}
