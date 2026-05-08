import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private repository;
    constructor(repository: UserRepository);
    createUser(data: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        email: string;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        email: string;
        id: string;
    }[]>;
}
