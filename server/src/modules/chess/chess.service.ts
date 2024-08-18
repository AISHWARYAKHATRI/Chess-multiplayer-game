import { Injectable } from '@nestjs/common';
import { GameDto, MoveDto } from './dto/game.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chess } from 'chess.js';

import { Game } from './entities/chess.entity';
import { GAME_EVENTS, GAME_STATUS } from 'src/common/game.enum';
import { User } from '../users/entities/users.entity';

@Injectable()
export class ChessService {
  private games: Map<number, Chess>;
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // CREATE GAME
  async createGame(newGame: GameDto) {
    // find the user who wants to create the game
    const playerWhite = await this.userRepository.findOneBy({
      id: newGame.player_white,
    });
    // check if there are any his/her ongoing game
    const onGoingGame = await this.gameRepository.findOne({
      where: [
        {
          player_white: { id: playerWhite.id },
          status: In([GAME_STATUS.ONGOING, GAME_STATUS.WAITING_FOR_PLAYER]),
        },
        {
          player_black: { id: playerWhite.id },
          status: In([GAME_STATUS.ONGOING, GAME_STATUS.WAITING_FOR_PLAYER]),
        },
      ],
      relations: ['player_white', 'player_black'],
    });

    if (onGoingGame) {
      return {
        event: GAME_EVENTS.ONGOING_GAME,
        gameId: onGoingGame.id,
        board: onGoingGame.board,
        message:
          'Cannot create a new game because there is already an ongoing game.',
      };
    }
    // if no on going game exists, then create new game
    const createdGame = this.gameRepository.create({
      ...newGame,
      player_white: playerWhite,
      board: newGame.board,
      status: newGame.status,
      result: newGame.result,
      player_black: null,
    });
    // save the game
    await this.gameRepository.save(createdGame);
    return {
      event: GAME_EVENTS.GAME_CREATED,
      gameId: createdGame.id,
      board: createdGame.board,
      message: 'New game created.',
    };
  }

  // JOIN GAME
  async joinGame(gameId: number, userId: number) {
    const createdGame = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['player_white', 'player_black'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!createdGame) {
      return {
        event: GAME_EVENTS.EXCEPTION,
        message: 'Game not found.',
      };
    }

    if (!user) {
      return {
        event: GAME_EVENTS.EXCEPTION,
        message: 'User not found',
      };
    }

    // if (createdGame.status !== GAME_STATUS.WAITING_FOR_PLAYER) {
    //   return {
    //     message: 'You cannot join this game.',
    //   };
    // }

    // No two same players are allowed to join
    if (
      createdGame.player_white?.id === userId ||
      createdGame.player_black?.id === userId
    ) {
      return {
        event: GAME_EVENTS.ALREADY_JOINED_GAME,
        message: 'You have already joined this game',
        board: createdGame.board,
      };
    }

    if (!createdGame.player_white) {
      createdGame.player_white = user;
    } else if (!createdGame.player_black) {
      createdGame.player_black = user;
    } else {
      return {
        event: GAME_EVENTS.EXCEPTION,
        message: 'The game is already full',
      };
    }

    if (createdGame.player_black && createdGame.player_white) {
      createdGame.status = GAME_STATUS.ONGOING;
    }

    await this.gameRepository.save(createdGame);

    return {
      event: GAME_EVENTS.GAME_JOINED,
      message: 'You have successfully joined the game.',
      board: createdGame.board,
    };
  }

  // PROCESS MOVE
  async processMove(move: MoveDto) {
    // Process the chess move here and update the game state
    const gameId = move.gameId;
    const chessGame = await this.gameRepository.findOne({
      where: { id: move.gameId },
    });

    const chess = new Chess(chessGame.board);

    // if (!chess) {
    //   return {
    //     message: 'Game not found.',
    //   };
    // }

    const moveResult = chess.move({
      from: move.from,
      to: move.to,
      promotion: 'q',
    });

    if (moveResult === null) {
      return {
        message: 'Invalid move',
      };
    }

    const fen = chess.fen();
    console.log('New', fen);
    chessGame.board = fen;
    await this.gameRepository.save(chessGame);

    return {
      gameId: gameId,
      board: fen,
    };
  }
}
