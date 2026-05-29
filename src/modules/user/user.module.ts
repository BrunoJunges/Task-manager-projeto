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
<<<<<<< HEAD
  exports: [UserService],
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
})
export class UserModule {}