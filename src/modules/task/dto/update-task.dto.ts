
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';

import { TaskPriority } from '../../../common/enums/task-priority.enum';
import { TaskStatus } from '../../../common/enums/task-status.enum';

export class UpdateTaskDto {

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}