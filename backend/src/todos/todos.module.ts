import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JWTMiddleware } from 'middleware/jwtMiddleware';
import { PrismaService } from 'src/prisma/Prisma.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [PrismaService],
})
export class TodosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes(TodosController);
  }
}
