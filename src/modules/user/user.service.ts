import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  createUser(data: CreateUserDto) {
    return this.repository.create(data);
  }

  getUsers() {
    return this.repository.findAll();
  }
}