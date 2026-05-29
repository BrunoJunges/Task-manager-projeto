import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
<<<<<<< HEAD
<<<<<<< HEAD
      select: {
        id: true,
        name: true,
        email: true,
      },
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
    });
  }

  findAll() {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
=======
    return this.prisma.user.findMany();
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
=======
    return this.prisma.user.findMany();
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
  }
}