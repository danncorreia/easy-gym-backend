import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exercise, ExerciseSchema } from './exercise.schema';

@Schema()
export class Workout {
  @Prop({ required: true, type: String, ref: 'Student' })
  id_aluno: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ type: [ExerciseSchema], default: [] })
  exercicios: Exercise[];

  @Prop({ required: true, default: Date.now })
  data_criacao: Date;

  @Prop({ required: true, default: Date.now })
  data_atualizacao: Date;

  @Prop({ required: true, default: true })
  ativo: boolean;
}

export type WorkoutDocument = Workout & Document;
export const WorkoutSchema = SchemaFactory.createForClass(Workout);
