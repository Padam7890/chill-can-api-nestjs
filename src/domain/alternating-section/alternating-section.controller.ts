import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AlternatingSectionService } from './alternating-section.service';
import { CreateAlternatingSectionDto } from './dto/create-alternating-section.dto';
import { UpdateAlternatingSectionDto } from './dto/update-alternating-section.dto';
import { ApiTags } from '@nestjs/swagger';
import { UniversalDecorator } from 'src/common/decorators/universal.decorator';
import { createResponse } from 'src/helper/response.helper';

@Controller('alternating-section')
@ApiTags("alternating-section")
export class AlternatingSectionController {
  constructor(private readonly alternatingSectionService: AlternatingSectionService) {}

  @Post()
  @UniversalDecorator({
    role: "admin",
    summary: "Create a new alternating section",
    responseType: CreateAlternatingSectionDto,
    includeBearerAuth: true,
  })
  
 async  create(@Body() createAlternatingSectionDto: CreateAlternatingSectionDto) {
    const alternatingSection = await this.alternatingSectionService.create(createAlternatingSectionDto);
    return createResponse(HttpStatus.CREATED, "Alternating section created successfully", alternatingSection);
  }

  @Get()
  @UniversalDecorator({
    summary: "Get all alternating sections",
    responseType: CreateAlternatingSectionDto,
  })
  async findAll() {
    const alternatingSections = await this.alternatingSectionService.findAll();
    return createResponse(HttpStatus.OK, "Alternating sections fetched successfully", alternatingSections);
  }

  @Get(':id')
  @UniversalDecorator({
    summary: "Get alternating section by id",
    responseType: CreateAlternatingSectionDto,
  })
  async findOne(@Param('id') id: string) {
    const alternatingSection = await this.alternatingSectionService.findOne(+id);
    return createResponse(HttpStatus.OK, "Alternating section fetched successfully", alternatingSection);
  }

  @Patch(':id')
  @UniversalDecorator({
    role: "admin",
    summary: "Update alternating section by id",
    responseType: CreateAlternatingSectionDto,
    includeBearerAuth: true,
  })
  async update(@Param('id') id: string, @Body() updateAlternatingSectionDto: UpdateAlternatingSectionDto) {
    const alternatingSection = await this.alternatingSectionService.update(+id, updateAlternatingSectionDto);
    return createResponse(HttpStatus.OK, "Alternating section updated successfully", alternatingSection);
  }

  @Delete(':id')
  @UniversalDecorator({
    role: "admin",
    summary: "Delete alternating section by id",
    responseType: CreateAlternatingSectionDto,
    includeBearerAuth: true,
  })
  async remove(@Param('id') id: string) {
    const alternatingSection = await this.alternatingSectionService.remove(+id);
    return createResponse(HttpStatus.OK, "Alternating section deleted successfully", alternatingSection);
  }
}
