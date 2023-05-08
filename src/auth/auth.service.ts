// archivo: src/auth/auth.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuth: LoginAuthDto) {
    const { email, password } = loginAuth;
    const userFound = await this.userService.findOneByEmail(email);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: userFound.email, sub: userFound.id };
    console.log(payload);
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
