import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categoria/categoria.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(@Payload() categoria: Categoria) {
    this.logger.log(`categoria: ${JSON.stringify(categoria)}`);

    return await this.appService.criarCategoria(categoria);
  }

  @MessagePattern('consultar-categoria')
  async consultarCategoria(@Payload() _id: string) {
    if (_id) {
      return await this.appService.buscarCategoriaPeloId(_id);
    } else {
      return await this.appService.buscarCategorias();
    }
  }
}
