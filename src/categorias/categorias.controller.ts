import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CategoriasService } from './categorias.service';
import { Categoria } from './interfaces/categoria.interface';

const ackErrors: string[] = ['E11000'];

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  logger = new Logger(CategoriasController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: Categoria,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.logger.log(`categoria: ${JSON.stringify(categoria)}`);

    try {
      await this.categoriasService.criarCategoria(categoria);
      await channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const filterAckErrors = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckErrors) {
        await channel.ack(originalMsg);
      }
    }
  }

  @MessagePattern('consultar-categorias')
  async consultarCategoria(@Payload() _id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (_id) {
        return await this.categoriasService.buscarCategoriaPeloId(_id);
      } else {
        return await this.categoriasService.buscarCategorias();
      }
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('atualizar-categoria')
  async atualizarCategoria(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.logger.log(`categoria: ${JSON.stringify(data)}`);

    try {
      const _id: string = data.id;
      const categoria: Categoria = data.categoria;
      await this.categoriasService.atualizarCategoria(_id, categoria);
      await channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const filterAckErrors = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckErrors) {
        await channel.ack(originalMsg);
      }
    }
  }
}
