import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducadorDto, makeEducador } from './dto/educador.dto';
import { Educador } from './schemas/educador.schema';

@Injectable()
export class EducadoresService {
  constructor(
    @InjectModel(Educador.name) private educadorModel: Model<Educador>,
  ) {}

  async create(createEducadorDto: EducadorDto): Promise<EducadorDto> {
    const createdEducador = new this.educadorModel(createEducadorDto);
    const savedEducador = await createdEducador.save();
    return makeEducador(savedEducador);
  }

  async findAll(): Promise<EducadorDto[]> {
    const educadores = await this.educadorModel.find().exec();
    return educadores.map(makeEducador);
  }

  async findOne(id: number): Promise<EducadorDto | null> {
    const educador = await this.educadorModel.findOne({ _id: id }).exec();
    if (!educador) {
      throw new NotFoundException(`Educator with ID ${id} not found`);
    }
    return makeEducador(educador);
  }

  async findByEmail(email: string): Promise<EducadorDto | null> {
    const educador = await this.educadorModel.findOne({ email }).exec();
    return educador ? makeEducador(educador) : null;
  }

  async update(
    id: number,
    updateEducadorDto: EducadorDto,
  ): Promise<EducadorDto | null> {
    const updatedEducador = await this.educadorModel
      .findOneAndUpdate({ _id: id }, updateEducadorDto, { new: true })
      .exec();
    if (!updatedEducador) {
      throw new NotFoundException(`Educator with ID ${id} not found`);
    }
    return makeEducador(updatedEducador);
  }

  async remove(id: number): Promise<EducadorDto | null> {
    const deletedEducador = await this.educadorModel
      .findOneAndDelete({ _id: id })
      .exec();
    return deletedEducador ? makeEducador(deletedEducador) : null;
  }
}
