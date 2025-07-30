import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<any>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, dto: RegisterDto) {
    try {
      const existing = await this.userModel.findOne({ email: dto.email });
      if (existing) {
        throw new ConflictException('Email already exists');
      }

      const user = new this.userModel(dto);
      await user.save();
      return { message: 'User registered successfully' };
    } catch (err) {
      console.error('Register error:', err);
      throw new InternalServerErrorException('Could not register');
    }
  }

  async login(dto: LoginDto) {
    try {
      console.log('Login payload:', dto);

      const user = await this.userModel.findOne({ email: dto.email });
      console.log('User found:', user);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(dto.password, user.password);
      console.log('Password match:', passwordMatch);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user._id.toString(), email: user.email };
      console.log('JWT payload:', payload);

      const token = this.jwtService.sign(payload);
      console.log('Token:', token);

      return { access_token: token };
    } catch (err) {
      console.error('Login error:', err);
      throw new InternalServerErrorException('Login failed');
    }
  }
}
