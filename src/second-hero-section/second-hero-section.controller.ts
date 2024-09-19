import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecondHeroSectionService } from './second-hero-section.service';
import { CreateSecondHeroSectionDto } from './dto/create-second-hero-section.dto';
import { UpdateSecondHeroSectionDto } from './dto/update-second-hero-section.dto';

@Controller('second-hero-section')
export class SecondHeroSectionController {
  constructor(private readonly secondHeroSectionService: SecondHeroSectionService) {}

  @Post()
  create(@Body() createSecondHeroSectionDto: CreateSecondHeroSectionDto) {
    return this.secondHeroSectionService.create(createSecondHeroSectionDto);
  }

  @Get()
  findAll() {
    return this.secondHeroSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secondHeroSectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecondHeroSectionDto: UpdateSecondHeroSectionDto) {
    return this.secondHeroSectionService.update(+id, updateSecondHeroSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secondHeroSectionService.remove(+id);
  }
}
