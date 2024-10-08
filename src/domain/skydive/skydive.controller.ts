import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { SkydiveService } from './skydive.service';
import { CreateSkydiveDto } from './dto/create-skydive.dto';
import { UpdateSkydiveDto } from './dto/update-skydive.dto';
import { ApiTags } from '@nestjs/swagger';
import { createResponse } from '../../helper/response.helper';
import { UniversalDecorator } from '../../common/decorators/universal.decorator';

@Controller('skydive')
@ApiTags("Sky Dive")
export class SkydiveController {
  constructor(private readonly skydiveService: SkydiveService) {}

  @Post()
  @UniversalDecorator({
    role: "ADMIN",
    summary: "Create Sky Dive",
    responseType: UpdateSkydiveDto,
    includeBearerAuth: true
  })
  async create(@Body() createSkydiveDto: CreateSkydiveDto) {
    const skydive =  await this.skydiveService.create(createSkydiveDto);
    return createResponse(HttpStatus.CREATED, "Sky Dive created successfully", skydive);
  }


  @Get()
  @UniversalDecorator({
    summary: "Get All Sky Dive",
    responseType: UpdateSkydiveDto,
  })
  async  findAll() {
    const skydive = await this.skydiveService.findAll();
    return createResponse(HttpStatus.OK, "Sky Dive fetched successfully", skydive);
  }

  @Get(':id')
  @UniversalDecorator({
    summary: "Get Sky Dive by Id",
    responseType: UpdateSkydiveDto,
  })
  async findOne(@Param('id') id: string) {
    const skydive = await this.skydiveService.findOne(+id);
    return createResponse(HttpStatus.OK, "Sky Dive fetched successfully", skydive);
  }

  @Patch(':id')
  @UniversalDecorator({
    role: "ADMIN",
    summary: "Update Sky Dive",
    responseType: UpdateSkydiveDto,
    includeBearerAuth: true
  })
  async update(@Param('id') id: string, @Body() updateSkydiveDto: UpdateSkydiveDto) {
    const skydive = await this.skydiveService.update(+id, updateSkydiveDto);
    return createResponse(HttpStatus.OK, "Sky Dive updated successfully", skydive);
  }

  @Delete(':id')
  @UniversalDecorator({
    role: "ADMIN",
    summary: "Delete Sky Dive",
    responseType: UpdateSkydiveDto,
    includeBearerAuth: true
  })
  async remove(@Param('id') id: string) {
    const skydive = await this.skydiveService.remove(+id);
    return createResponse(HttpStatus.OK, "Sky Dive deleted successfully", skydive);
  }
}
