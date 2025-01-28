import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EducadoresModule } from '../educadores/educadores.module';

@Module({
  imports: [
    EducadoresModule,
    JwtModule.register({
      global: true,
      secret: 'seu-segredo-jwt', // Em produção, use variáveis de ambiente
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
