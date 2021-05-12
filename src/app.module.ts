import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresController } from './jogadores/jogadores.controller';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(env.MONGOOSE_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    CategoriasModule,
    JogadoresModule,
  ],
  controllers: [JogadoresController],
  providers: [],
})
export class AppModule {}
