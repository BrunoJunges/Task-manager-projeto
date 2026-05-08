import { TaskPriority } from '../../../common/enums/task-priority.enum';
import { TaskStatus } from '../../../common/enums/task-status.enum';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string;
    status?: TaskStatus;
}
