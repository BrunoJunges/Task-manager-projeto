// User module
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}