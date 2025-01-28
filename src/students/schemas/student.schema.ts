import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  id_educador: number;

  @Prop({ required: true })
  cadastro: Date;

  @Prop({ required: true })
  nome: string;

  @Prop()
  avatar: string;
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
