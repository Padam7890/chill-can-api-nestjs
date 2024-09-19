import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { SecondHeroSectionService } from './second-hero-section.service';
import { CreateSecondHeroSectionDto } from './dto/create-second-hero-section.dto';
import { UpdateSecondHeroSectionDto } from './dto/update-second-hero-section.dto';
import { createResponse } from 'src/helper/response.helper';
import { UniversalDecorator } from 'src/common/decorators/universal.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';


@Controller('second-hero-section')
export class SecondHeroSectionController {
  constructor(
    private readonly secondHeroSectionService: SecondHeroSectionService,
  ) {}

  @Post()
  @UniversalDecorator({
    guards: [AuthGuard, RoleGuard],
    role: 'USER',
    summary: 'Form Second Hero Section',
    responseType: CreateSecondHeroSectionDto,
    includeBearerAuth: true,
  })

  async create(@Body() createSecondHeroSectionDto: CreateSecondHeroSectionDto) {
    const secondHeroSection = await this.secondHeroSectionService.create(
      createSecondHeroSectionDto,
    );
    return createResponse(
      HttpStatus.CREATED,
      'second hero section created successfully',
      secondHeroSection,
    );
  }

  @Get()
  @UniversalDecorator({
    summary: 'All Hero Section Content',
    responseType: CreateSecondHeroSectionDto,
  })
  async findAll() {
    const secondHeroSection = await this.secondHeroSectionService.findAll();
    return createResponse(
      HttpStatus.OK,
      'second hero section fetched successfully',
      secondHeroSection,
    );
  }

  @Get(':id')
  @UniversalDecorator({
    summary: 'One Hero Section Content',
    responseType: CreateSecondHeroSectionDto,
  })
  findOne(@Param('id') id: string) {
    return this.secondHeroSectionService.findOne(+id);
  }

  @Patch(':id')
  @UniversalDecorator({
    guards: [AuthGuard, RoleGuard],
    role: 'USER',
    summary: 'Update Form Second Hero Section',
    responseType: CreateSecondHeroSectionDto,
    includeBearerAuth: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateSecondHeroSectionDto: UpdateSecondHeroSectionDto,
  ) {
    return this.secondHeroSectionService.update(
      +id,
      updateSecondHeroSectionDto,
    );
  }

  @Delete(':id')
  @UniversalDecorator({
    guards: [AuthGuard, RoleGuard],
    role: 'USER',
    summary: ' Second Hero Section Delete',
    responseType: CreateSecondHeroSectionDto,
    includeBearerAuth: true,
  })
  remove(@Param('id') id: string) {
    return this.secondHeroSectionService.remove(+id);
  }
}
