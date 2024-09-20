import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UniversalDecorator } from '../common/decorators/universal.decorator';
import { createResponse } from '../helper/response.helper';

@Controller('hero-section')
@ApiTags('Hero Section')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Post()
  @UniversalDecorator({
    role: 'USER',
    summary: 'Form Hero Section',
    responseType: UpdateHeroSectionDto,
    includeBearerAuth: true,
  })
  async create(@Body() createHeroSectionDto: CreateHeroSectionDto) {
    const heroSection =
      await this.heroSectionService.create(createHeroSectionDto);
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section created successfully',
      heroSection,
    );
  }

  @Get()
  @UniversalDecorator({
    summary: 'Get Hero Section',
    responseType: UpdateHeroSectionDto,
  })
  async findAll() {
    const heroSection = await this.heroSectionService.findAll();
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section Fetched',
      heroSection,
    );
  }

  @Get(':id')
  @UniversalDecorator({
    summary: 'One Hero Section',
    responseType: UpdateHeroSectionDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const herosection = await this.heroSectionService.findOne(id);
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section Fetched Sucessfull',
      herosection,
    );
  }

  @Patch(':id')
  @UniversalDecorator({
    role: 'ADMIN',
    summary: 'Form Hero Section Update',
    responseType: UpdateHeroSectionDto,
    includeBearerAuth: true,
  })
  async update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateHeroSectionDto: UpdateHeroSectionDto,
  ) {
    const heroSection = await this.heroSectionService.update(id, updateHeroSectionDto);
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section updated successfully',
      heroSection,
    );
  }


  @Delete(':id')
  @UniversalDecorator({
    role: 'USER',
    summary: 'Form Hero Section Delete',
    responseType: CreateHeroSectionDto,
    includeBearerAuth: true,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const heroSection = await this.heroSectionService.remove(id);
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section deleted successfully',
      heroSection,
    );
  }
}
