import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        email: string;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        email: string;
        id: string;
    }[]>;
}
