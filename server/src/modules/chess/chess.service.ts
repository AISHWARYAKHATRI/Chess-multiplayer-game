import { Injectable } from '@nestjs/common';
import { GameDto, MoveDto } from './dto/game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/chess.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChessService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
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
    const game = await this.gameRepository.create(newGame);
    return game;
  }

  initializeBoard(): string[][] {
    // Initialize a standard chess board here
    return [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];
  }
}
