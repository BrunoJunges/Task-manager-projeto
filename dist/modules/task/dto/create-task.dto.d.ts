import { TaskPriority } from '../../../common/enums/task-priority.enum';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate: string;
    userId: string;
}
