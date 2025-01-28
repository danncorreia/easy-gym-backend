import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  series: number;

  @Prop({ required: true })
  repeticoes: number;

  @Prop({ required: true })
  carga: number;

  @Prop({ required: true, default: Date.now })
  data_criacao: Date;

  @Prop({ required: true, default: Date.now })
  data_atualizacao: Date;

  @Prop({ required: true, default: true })
  ativo: boolean;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
