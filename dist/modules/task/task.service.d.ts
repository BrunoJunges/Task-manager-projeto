import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskService {
    private repository;
    constructor(repository: TaskRepository);
    createTask(data: CreateTaskDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    getTasks(): Promise<({
        user: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    })[]>;
    getTaskById(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    updateTask(id: string, data: UpdateTaskDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    deleteTask(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    completeTask(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
}
