import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/Prisma.service';
import {
  addTodoSchema,
  deleteTodoSchema,
  markTodoCompletedSchema,
  updateTodoSchema,
} from 'swagger/todos.schema';

@Controller('todos')
@ApiTags('todos')
@ApiBearerAuth('access-token')
export class TodosController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(['todos'])
  async GetTodos(@Body() body: { author_email: string }) {
    try {
      const { author_email } = body;
      const data: GetTodoModel[] = await this.prismaService.todos.findMany({
        where: { author_email },
        orderBy: { id: 'asc' },
        select: {
          id: true,
          status: true,
          title: true,
        },
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(['add'])
  @ApiBody(addTodoSchema)
  @ApiProperty({ title: 'title' })
  async AddTodo(@Body() body: AddTodoModel) {
    try {
      const { title, author_email } = body;

      await this.prismaService.todos.create({
        data: { title, author_email },
      });
      return { success: true, message: 'Successfully added new todo' };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(['update'])
  @ApiBody(updateTodoSchema)
  async UpdateTodo(@Body() body: UpdateTodoModel) {
    try {
      const { newTitle, id, author_email } = body;

      //checking if user has permission for this action
      const todo = await this.prismaService.todos.findFirst({
        where: { id, author_email },
      });

      if (!todo) {
        throw new Error("Todo doesn't exist or you don't have permission.");
      }

      await this.prismaService.todos.update({
        data: { title: newTitle },
        where: { id },
      });
      return { success: true, message: 'Successfully updated the todo' };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(['markCompleted'])
  @ApiBody(markTodoCompletedSchema)
  async MarkCompleteTodo(@Body() body: MarkTodoCompleteModel) {
    try {
      const { id, author_email } = body;

      //checking if user has permission for this action
      const todo = await this.prismaService.todos.findFirst({
        where: { id, author_email },
      });

      if (!todo) {
        throw new Error("Todo doesn't exist or you don't have permission.");
      }

      await this.prismaService.todos.update({
        data: { status: 'completed' },
        where: { id },
      });
      return { success: true, message: 'Successfully updated the todo' };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(['delete'])
  @ApiParam(deleteTodoSchema)
  async DeleteTodo(
    @Query() query: { id: number },
    @Body() body: DeleteTodoModel,
  ) {
    try {
      const { author_email } = body;
      const { id } = query;

      //checking if user has permission for this action
      const todo = await this.prismaService.todos.findFirst({
        where: { id: Number(id) },
      });

      if (!todo) {
        throw new Error("Todo doesn't exist or you don't have permission.");
      }

      await this.prismaService.todos.delete({ where: { id: Number(id) } });
      return { success: true, message: 'Successfully deleted the todo' };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
