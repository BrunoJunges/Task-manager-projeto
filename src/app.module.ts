import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
<<<<<<< HEAD
import { AuthModule } from './modules/auth/auth.module';
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TaskModule,
<<<<<<< HEAD
    AuthModule,
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
  ],
})
export class AppModule {}