import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { GAME_RESULT, GAME_STATUS } from 'src/common/game.enum';
import { User } from 'src/modules/users/entities/users.entity';

export class MoveDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;
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
