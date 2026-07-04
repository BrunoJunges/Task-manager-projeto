import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(data: CreateUserDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    const created = await this.repository.create({
      name: data.name,
      email: data.email,
      password: hashed,
    } as CreateUserDto);
    return created;
  }

  getUsers() {
    return this.repository.findAll();
  }

  findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }
}