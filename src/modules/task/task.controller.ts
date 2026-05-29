import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Patch,
<<<<<<< HEAD
<<<<<<< HEAD
  UseGuards,
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
<<<<<<< HEAD
<<<<<<< HEAD
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
=======

>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
=======

>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
@Controller('tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.service.createTask(data);
  }

  @Get()
  findAll() {
    return this.service.getTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getTaskById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
  ) {
    return this.service.updateTask(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.deleteTask(id);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.service.completeTask(id);
  }
}