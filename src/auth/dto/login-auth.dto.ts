import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class LoginAuthDto extends PartialType(
  PickType(CreateUserDto, ['email', 'password']),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
