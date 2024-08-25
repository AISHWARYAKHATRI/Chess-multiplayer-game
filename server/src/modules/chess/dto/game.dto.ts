import { Square } from 'chess.js';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { GAME_RESULT, GAME_STATUS } from 'src/common/game.enum';

export class MoveDto {
  @IsUUID()
  gameId: number;

  @IsString()
  @IsNotEmpty()
  from: Square;

  @IsString()
  @IsNotEmpty()
  to: Square;
}

export class GameDto {
  @IsUUID()
  player_white: number;

  @IsUUID()
  player_black?: number;

  @IsString()
  board?: string;

  @IsEnum([
    GAME_STATUS.ONGOING,
    GAME_STATUS.FINISHED,
    GAME_STATUS.WAITING_FOR_PLAYER,
  ])
  status?: string;

  @IsEnum([
    GAME_RESULT.WHITE_WIN,
    GAME_RESULT.BLACK_WIN,
    GAME_RESULT.DRAW,
    GAME_RESULT.UNDECIDED,
  ])
  result?: string;
}

export class GameState {
  @IsUUID()
  gameId: number;

  @IsString()
  board: string;
}
