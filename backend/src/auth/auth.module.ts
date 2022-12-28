import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JWTMiddleware } from 'middleware/jwtMiddleware';
import { PrismaService } from 'src/prisma/Prisma.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTMiddleware)
      .forRoutes(...['/auth/getUserInfo', '/auth/changePassword']);
  }
}
