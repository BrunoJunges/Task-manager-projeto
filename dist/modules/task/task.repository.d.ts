import { PrismaService } from '../../database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
    findById(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        title: string;
        description: string | null;
        priority: string;
        dueDate: Date;
        userId: string;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
