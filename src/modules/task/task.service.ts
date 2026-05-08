import {
  Injectable,
  BadRequestException,
  NotFoundException,
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

  async getTasks() {
    return this.repository.findAll();
  }

  async getTaskById(id: string) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundException('Task not found');
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

  async deleteTask(id: string) {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new NotFoundException('Task not found');
    }

    return this.repository.delete(id);
  }

  async completeTask(id: string) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
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