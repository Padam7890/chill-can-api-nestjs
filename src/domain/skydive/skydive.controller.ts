import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkydiveService } from './skydive.service';
import { CreateSkydiveDto } from './dto/create-skydive.dto';
import { UpdateSkydiveDto } from './dto/update-skydive.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('skydive')
@ApiTags("Sky Dive")
export class SkydiveController {
  constructor(private readonly skydiveService: SkydiveService) {}

  @Post()
  async create(@Body() createSkydiveDto: CreateSkydiveDto) {
    return  await this.skydiveService.create(createSkydiveDto);
  }

  @Get()
  findAll() {
    return this.skydiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skydiveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkydiveDto: UpdateSkydiveDto) {
    return this.skydiveService.update(+id, updateSkydiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skydiveService.remove(+id);
  }
}
