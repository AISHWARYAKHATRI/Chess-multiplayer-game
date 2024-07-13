import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChessGateway } from './gateway/chess.gateway';
import { ChessService } from './chess.service';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ChessGateway, ChessService],
})
export class ChessModule {}
