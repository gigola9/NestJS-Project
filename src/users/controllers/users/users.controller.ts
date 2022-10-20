import { ClassSerializerInterceptor, Controller, Get, Post, HttpException, HttpStatus, Inject, NotFoundException, Param, ParseIntPipe, UseFilters, UseInterceptors, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../../../auth/utils/LocalGuard';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UserNotFoundException } from '../../exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from '../../filters/HttpException.filter';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types';
import { SkipThrottle, Throttle } from "@nestjs/throttler";

@Controller('users')
export class UsersController {

  constructor(@Inject('USER_SERVICE') private readonly userService: UsersService) {}

  // Skip Rate Limit
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SkipThrottle()
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  getByUserName(@Param('username') username: string) {
    const user = this.userService.getUserByUserName(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  // Custom Rate Limit
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Throttle(5, 10)
  @Get('id/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (user) return new SerializedUser(user);
    else {
      throw new UserNotFoundException();
      // throw new NotFoundException();
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
