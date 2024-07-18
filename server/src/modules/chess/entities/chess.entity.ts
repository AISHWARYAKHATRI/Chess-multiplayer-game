import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GAME_RESULT, GAME_STATUS, SIDES } from 'src/common/game.enum';
import { User } from 'src/modules/users/entities/users.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  player_white: User;

  @ManyToOne(() => User)
  player_black?: User;

  @Column({
    type: 'enum',
    enum: [
      GAME_STATUS.ONGOING,
      GAME_STATUS.FINISHED,
      GAME_STATUS.WAITING_FOR_PLAYER,
    ],
    default: GAME_STATUS.WAITING_FOR_PLAYER,
  })
  status?: string;

  @Column({
    type: 'enum',
    enum: [
      GAME_RESULT.WHITE_WIN,
      GAME_RESULT.BLACK_WIN,
      GAME_RESULT.DRAW,
      GAME_RESULT.UNDECIDED,
    ],
    default: GAME_RESULT.UNDECIDED,
  })
  result: string;

  @Column({
    type: 'enum',
    enum: [SIDES.WHITE, SIDES.BLACK],
  })
  turn: string;

  @Column('text')
  board?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
