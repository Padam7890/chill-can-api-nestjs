import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SecondHeroSectionService } from './second-hero-section.service';
import { CreateSecondHeroSectionDto } from './dto/create-second-hero-section.dto';
import { UpdateSecondHeroSectionDto } from './dto/update-second-hero-section.dto';
import { createResponse } from '../../helper/response.helper';
import { UniversalDecorator } from '../../common/decorators/universal.decorator';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('second-hero-section')
@ApiTags('Second hero section')
export class SecondHeroSectionController {
  constructor(
    private readonly secondHeroSectionService: SecondHeroSectionService,
  ) {}

  @Post()
  @UniversalDecorator({
    role: 'ADMIN',
    summary: 'Form Second Hero Section',
    responseType: CreateSecondHeroSectionDto,
    includeBearerAuth: true,
  })
  @UseInterceptors(FileInterceptor('heroImage'))
  async create(
    @Body() createSecondHeroSectionDto: CreateSecondHeroSectionDto,
    @UploadedFile() heroImage: Express.Multer.File,
  ) {
    if (!heroImage) {
      return createResponse(HttpStatus.BAD_REQUEST, 'Hero image is required');
    }

    const uploadedImageUrl: string =
      await this.secondHeroSectionService.uploadImageToCloudinary(heroImage);
    console.log(uploadedImageUrl);

    const secondHeroSection = await this.secondHeroSectionService.create({
      ...createSecondHeroSectionDto,
      heroImage: uploadedImageUrl,
    });

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
    role: 'ADMIN',
    summary: 'Update Form Second Hero Section',
    responseType: CreateSecondHeroSectionDto,
    includeBearerAuth: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateSecondHeroSectionDto: UpdateSecondHeroSectionDto,
    @UploadedFile() heroImage: Express.Multer.File,
  ) {
    if (!heroImage) {
      return createResponse(HttpStatus.BAD_REQUEST, 'Hero image is required');
    }

    const uploadedImageUrl: string =
      await this.secondHeroSectionService.uploadImageToCloudinary(heroImage);
    updateSecondHeroSectionDto.heroImage = uploadedImageUrl;
    const updateSecondHeroSec = this.secondHeroSectionService.update(
      +id,
      updateSecondHeroSectionDto,
    );
    return createResponse(
      HttpStatus.OK,
      'Second hero section updated successfully',
      updateSecondHeroSec,
    );
  }

  @Delete(':id')
  @UniversalDecorator({
    role: 'ADMIN',
    summary: ' Second Hero Section Delete',
    responseType: CreateSecondHeroSectionDto,
    includeBearerAuth: true,
  })
  remove(@Param('id') id: string) {
    return this.secondHeroSectionService.remove(+id);
  }
}
