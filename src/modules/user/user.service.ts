import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import * as bcrypt from 'bcrypt';
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

<<<<<<< HEAD
  async createUser(data: CreateUserDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    const created = await this.repository.create({
      name: data.name,
      email: data.email,
      password: hashed,
    } as CreateUserDto);
    return created;
=======
  createUser(data: CreateUserDto) {
    return this.repository.create(data);
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
  }

  getUsers() {
    return this.repository.findAll();
  }
<<<<<<< HEAD

  findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
}