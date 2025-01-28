import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EducadoresService } from '../educadores/educadores.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private educadoresService: EducadoresService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const educador = await this.educadoresService.findByEmail(loginDto.email);

    if (!educador) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.senha,
      educador.senha,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: educador._id, email: educador.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      educador: {
        _id: educador._id,
        nome: educador.nome,
        email: educador.email,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingEducador = await this.educadoresService.findByEmail(
      registerDto.email,
    );

    if (existingEducador) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(registerDto.senha, 10);

    const newEducador = await this.educadoresService.create({
      ...registerDto,
      senha: hashedPassword,
    });

    const payload = { sub: newEducador._id, email: newEducador.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      educador: {
        _id: newEducador._id,
        nome: newEducador.nome,
        email: newEducador.email,
      },
    };
  }
}
