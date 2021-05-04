import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaSchema } from './interfaces/categoria/categoria.schema';
import { JogadorSchema } from './interfaces/jogador/jogador.schema';

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
    MongooseModule.forFeature([
      { name: 'Categoria', schema: CategoriaSchema },
      { name: 'Jogador', schema: JogadorSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
