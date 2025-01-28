import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EducadoresService } from './educadores.service';
import { EducadorDto } from './dto/educador.dto';

@Controller('educadores')
export class EducadoresController {
  constructor(private readonly educadoresService: EducadoresService) {}

  @Post()
  create(@Body() createEducadorDto: EducadorDto) {
    return this.educadoresService.create(createEducadorDto);
  }

  @Get()
  findAll() {
    return this.educadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.educadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEducadorDto: EducadorDto) {
    return this.educadoresService.update(+id, updateEducadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.educadoresService.remove(+id);
  }
}
