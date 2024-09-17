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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UniversalDecorator } from 'src/common/decorators/universal.decorator';

@Controller('hero-section')
@ApiTags('Hero Section')

export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Post()
  @UniversalDecorator({
    guards:[AuthGuard, RoleGuard ],
    role:'USER',
    summary: 'Form Hero Section',
    responseType: UpdateHeroSectionDto,
    includeBearerAuth: true, 
  })
  create(@Body() createHeroSectionDto: CreateHeroSectionDto) {
    return this.heroSectionService.create(createHeroSectionDto);
  }
  
  @Get()
  @UniversalDecorator({
    summary: 'Get Hero Section',
    responseType: UpdateHeroSectionDto,
  })
  findAll() {
    return this.heroSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroSectionService.findOne(+id);
  }
  
  @Patch(':id')
  @ApiBearerAuth("JWT-auth")
  update(
    @Param('id') id: string,
    @Body() updateHeroSectionDto: UpdateHeroSectionDto,
  ) {
    return this.heroSectionService.update(+id, updateHeroSectionDto);
  }

  @Delete(':id')
  @ApiBearerAuth("JWT-auth")

  remove(@Param('id') id: string) {
    return this.heroSectionService.remove(+id);
  }
}
