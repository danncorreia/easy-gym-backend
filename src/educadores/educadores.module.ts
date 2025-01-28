import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EducadoresService } from './educadores.service';
import { EducadoresController } from './educadores.controller';
import { Educador, EducadorSchema } from './schemas/educador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Educador.name, schema: EducadorSchema },
    ]),
  ],
  controllers: [EducadoresController],
  providers: [EducadoresService],
  exports: [EducadoresService],
})
export class EducadoresModule {}
