import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('hero-section')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Post()
  create(@Body() createHeroSectionDto: CreateHeroSectionDto) {
    return this.heroSectionService.create(createHeroSectionDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('USER')
  findAll() {
    return this.heroSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroSectionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeroSectionDto: UpdateHeroSectionDto,
  ) {
    return this.heroSectionService.update(+id, updateHeroSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroSectionService.remove(+id);
  }
}
