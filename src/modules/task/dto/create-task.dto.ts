import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUUID,
} from 'class-validator';

import { TaskPriority } from '../../../common/enums/task-priority.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority!: TaskPriority;

  @IsDateString()
  @IsNotEmpty()
  dueDate!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}