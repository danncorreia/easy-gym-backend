import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Counter, CounterDocument } from '../../common/schemas/counter.schema';

export type EducadorDocument = HydratedDocument<Educador>;

@Schema()
export class Educador {
  @Prop({ required: true, unique: true })
  _id: number;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  numero_registro: string;

  @Prop({ required: true })
  data_nascimento: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;
}

export const EducadorSchema = SchemaFactory.createForClass(Educador);

EducadorSchema.pre('save', async function (next) {
  if (this.isNew) {
    const CounterModel = this.model('Counter') as Model<CounterDocument>;

    const counter = await CounterModel.findByIdAndUpdate(
      'educadorId',
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!counter || typeof counter.seq !== 'number') {
      throw new Error('Failed to generate sequence for Educador _id');
    }

    this._id = counter.seq;
  }
  next();
});
