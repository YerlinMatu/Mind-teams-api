import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  englishLevel?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  technicalSkills?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cvLink?: string;

  @ApiProperty()
  @IsNotEmpty()
  role: 'admin' | 'normal' = 'normal';
}
