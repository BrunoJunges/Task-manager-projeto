import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.service.createUser(data);
  }

  @Get()
  findAll() {
    return this.service.getUsers();
  }
}