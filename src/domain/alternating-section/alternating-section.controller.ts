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
