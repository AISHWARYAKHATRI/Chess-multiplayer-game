import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/entities/users.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  player_white: User;

  @ManyToOne(() => User)
  player_black: User;

  @Column({
    type: 'enum',
    enum: ['ongoing', 'finished', 'draw', 'waiting_for_player'],
    default: ['waiting_for_player'],
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['white_win', 'black_win', 'draw', 'undecided'],
  })
  result: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
