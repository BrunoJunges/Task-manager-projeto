import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '../../common/enums/task-status.enum';

@Injectable()
export class TaskService {
  constructor(private repository: TaskRepository) {}

  async createTask(data: CreateTaskDto) {
    const dueDate = new Date(data.dueDate);

    if (dueDate < new Date()) {
      throw new BadRequestException(
        'Due date cannot be in the past',
      );
    }

    return this.repository.create(data);
  }

  async getTasks(userId: string) {
    return this.repository.findAllByUser(userId);
  }

  async getTaskById(id: string, userId: string) {
    const task = await this.repository.findByIdAndUser(id, userId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async updateTask(id: string, data: UpdateTaskDto, userId: string) {
    const existing = await this.repository.findByIdAndUser(id, userId);

    if (!existing) {
      throw new NotFoundException('Task not found');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    if (
      data.dueDate &&
      new Date(data.dueDate) < new Date()
    ) {
      throw new BadRequestException(
        'Due date cannot be in the past',
      );
    }

    return this.repository.update(id, data);
  }

  async deleteTask(id: string, userId: string) {
    const existing = await this.repository.findByIdAndUser(id, userId);

    if (!existing) {
      throw new NotFoundException('Task not found');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return this.repository.delete(id);
  }

  async completeTask(id: string, userId: string) {
    const task = await this.repository.findByIdAndUser(id, userId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    if (task.status === 'COMPLETED') {
      throw new BadRequestException(
        'Task already completed',
      );
    }

    return this.repository.update(id, {
      status: TaskStatus.COMPLETED,
    });
  }
}