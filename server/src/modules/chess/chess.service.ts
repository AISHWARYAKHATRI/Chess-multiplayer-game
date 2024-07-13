import { Injectable } from '@nestjs/common';
import { MoveDto } from './dto/move.dto';
import { GameState } from './interface/chess.interface';

@Injectable()
export class ChessService {
  private games: { [key: string]: GameState } = {};

  processMove(move: MoveDto): GameState {
    // Process the chess move here and update the game state
    const gameId = move.gameId;
    const game = this.games[gameId] || this.createGame(gameId);

    // Update the game state with the new move
    // game.board = updateBoard(game.board, move);
    // game.turn = toggleTurn(game.turn);

    this.games[gameId] = game;
    return game;
  }

  createGame(gameId: string): GameState {
    const initialState: GameState = {
      gameId,
      board: this.initializeBoard(),
      turn: 'white',
      players: [],
    };
    this.games[gameId] = initialState;
    return initialState;
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
