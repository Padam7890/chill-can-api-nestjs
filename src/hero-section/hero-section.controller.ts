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
} from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UniversalDecorator } from 'src/common/decorators/universal.decorator';
import { createResponse } from 'src/helper/response.helper';

@Controller('hero-section')
@ApiTags('Hero Section')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Post()
  @UniversalDecorator({
    guards: [AuthGuard, RoleGuard],
    role: 'ADMIN',
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
      'Hero Section Fetched Sucessfull',
      heroSection,
    );
  }

  @Get(':id')
  @UniversalDecorator({
    summary: 'One Hero Section',
    responseType: UpdateHeroSectionDto,
  })
  async findOne(@Param('id') id: string) {
    const herosection = await this.heroSectionService.findOne(+id);
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section Fetched Sucessfull',
      herosection,
    );
  }

  @Patch(':id')
  @UniversalDecorator({
    guards: [AuthGuard, RoleGuard],
    role: 'ADMIN',
    summary: 'Form Hero Section Update',
    responseType: UpdateHeroSectionDto,
    includeBearerAuth: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateHeroSectionDto: UpdateHeroSectionDto,
  ) {
    const heroSection = await this.heroSectionService.update(+id, updateHeroSectionDto);
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section updated successfully',
      heroSection,
    );
  }



  @Delete(':id')
  @UniversalDecorator({
    guards: [AuthGuard, RoleGuard],
    role: 'ADMIN',
    summary: 'Form Hero Section Delete',
    responseType: '',
    includeBearerAuth: true,
  })
  async remove(@Param('id') id: string) {
    const heroSection = await this.heroSectionService.remove(+id);
    return createResponse(
      HttpStatus.CREATED,
      'Hero Section deleted successfully',
      heroSection,
    );
  }
}