import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  changePasswordSchema,
  loginSchema,
  signupSchema,
} from 'swagger/auth.schema';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(['getUserInfo'])
  async getUserInfo(@Body() body: { author_email: string }) {
    const { author_email } = body;
    return { success: true, userEmail: author_email };
  }

  @Patch(['changePassword'])
  @ApiBody(changePasswordSchema)
  async changePassword(@Body() body: ChangePasswordModel) {
    try {
      const { author_email, oldPassword, newPassword } = body;

      const user = await this.prismaService.users.findFirst({
        where: { email: author_email },
      });

      if (!user?.email) {
        throw new HttpException(
          { error: true, message: 'You are unauthorized for this action.' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user?.password);

      if (!isPasswordValid) throw new Error("Old password didn't match");

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await this.prismaService.users.update({
        data: { password: hashedNewPassword },
        where: { email: author_email },
      });
      return { success: true, message: 'Password Updated Successfully' };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(['signup'])
  @ApiBody(signupSchema)
  async Signup(@Body() body: AuthModel) {
    try {
      const { email, password } = body;

      const user = await this.prismaService.users.findFirst({
        where: { email },
      });

      if (user) {
        throw new HttpException(
          { error: true, message: 'Email already taken' },
          HttpStatus.CONFLICT,
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.prismaService.users.create({
        data: { email, password: hashedPassword },
      });
      return { success: true, message: 'User Created Successfully' };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(['login'])
  @ApiBody(loginSchema)
  async Login(@Body() body: AuthModel) {
    try {
      const { email, password } = body;
      const data = await this.prismaService.users.findFirst({
        where: { email },
      });

      if (!data?.email) throw new Error('Invalid Credentials');

      const token = jwt.sign({ email }, process.env.JWT_KEY, {
        expiresIn: '1d',
      });

      const isPasswordValid = await bcrypt.compare(password, data?.password);

      if (!isPasswordValid) throw new Error("Passwords didn't match");

      return {
        success: true,
        message: 'Login successful',
        accessToken: token,
      };
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
