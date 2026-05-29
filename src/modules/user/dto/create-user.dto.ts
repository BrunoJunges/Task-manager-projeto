<<<<<<< HEAD
<<<<<<< HEAD
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
=======
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
=======
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
<<<<<<< HEAD
<<<<<<< HEAD

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
=======
>>>>>>> faf3c01fba72085ba64ed7c266195f6daf309b1f
}