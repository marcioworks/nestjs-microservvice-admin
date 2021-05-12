import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './jogador.schema';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
  ],
  providers: [JogadoresService],
  controllers: [JogadoresController],
})
export class JogadoresModule {}
