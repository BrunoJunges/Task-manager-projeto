import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.service.createTask(data);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.getTasks(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.getTaskById(id, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
    @CurrentUser() user: any,
  ) {
    return this.service.updateTask(id, data, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.deleteTask(id, user.id);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.completeTask(id, user.id);
  }
}