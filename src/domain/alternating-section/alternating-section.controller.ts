import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlternatingSectionService } from './alternating-section.service';
import { CreateAlternatingSectionDto } from './dto/create-alternating-section.dto';
import { UpdateAlternatingSectionDto } from './dto/update-alternating-section.dto';

@Controller('alternating-section')
export class AlternatingSectionController {
  constructor(private readonly alternatingSectionService: AlternatingSectionService) {}

  @Post()
  create(@Body() createAlternatingSectionDto: CreateAlternatingSectionDto) {
    return this.alternatingSectionService.create(createAlternatingSectionDto);
  }

  @Get()
  findAll() {
    return this.alternatingSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alternatingSectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlternatingSectionDto: UpdateAlternatingSectionDto) {
    return this.alternatingSectionService.update(+id, updateAlternatingSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alternatingSectionService.remove(+id);
  }
}
