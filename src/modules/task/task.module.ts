import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}