import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private service;
    constructor(service: TaskService);
    create(data: CreateTaskDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    findAll(): Promise<({
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
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    update(id: string, data: UpdateTaskDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
    complete(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }>;
}
