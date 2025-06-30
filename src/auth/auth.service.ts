import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const adminUser = {
      username: 'admin',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    };

    if (username === adminUser.username) {
      const isPasswordValid = await bcrypt.compare(password, adminUser.password);
      if (isPasswordValid) {
        return { username: adminUser.username };
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 