import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...data,
        status: 'PENDING',
        dueDate: new Date(data.dueDate),
      },
    });
  }

  findAll() {
    return this.prisma.task.findMany({
      include: {
        user: true,
      },
    });
  }

  findAllByUser(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
  }

  findById(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  findByIdAndUser(id: string, userId: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  update(id: string, data: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        ...(data.dueDate && {
          dueDate: new Date(data.dueDate),
        }),
      },
    });
  }

  delete(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}