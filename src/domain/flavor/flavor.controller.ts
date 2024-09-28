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
import { FlavorService } from './flavor.service';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { ApiTags } from '@nestjs/swagger';
import { createResponse } from '../../helper/response.helper';
import { UniversalDecorator } from '../../common/decorators/universal.decorator';

@Controller('flavor')
@ApiTags('Flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}

  @Post()
  @UniversalDecorator({
    role: 'ADMIN',
    summary: 'Create Flavor',
    responseType: CreateFlavorDto,
    includeBearerAuth: true,
  })
  async create(@Body() createFlavorDto: CreateFlavorDto) {
    const flavor = await this.flavorService.create(createFlavorDto);
    return createResponse(
      HttpStatus.CREATED,
      'Flavor created successfully',
      flavor,
    );
  }

  @Get()
  @UniversalDecorator({
    summary: 'Get Flavors',
    responseType: CreateFlavorDto,
  })
  async findAll() {
    const flavors = await this.flavorService.findAll();
    return createResponse(
      HttpStatus.OK,
      'Flavors fetched successfully',
      flavors,
    );
  }

  @Get(':id')
  @UniversalDecorator({
    summary: 'Get Flavor',
    responseType: CreateFlavorDto,
  })
  async findOne(@Param('id') id: string) {
    const flavor = await this.flavorService.findOne(+id);
    return createResponse(HttpStatus.OK, 'Flavor fetched successfully', flavor);
  }

  @Patch(':id')
  @UniversalDecorator({
    role: 'ADMIN',
    summary: 'Update Flavor',
    responseType: UpdateFlavorDto,
    includeBearerAuth: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFlavorDto: UpdateFlavorDto,
  ) {
    const flavor = await this.flavorService.update(+id, updateFlavorDto);
    return createResponse(HttpStatus.OK, 'Flavor updated successfully', flavor);
  }

  @Delete(':id')
  @UniversalDecorator({
    role: 'ADMIN',
    summary: 'Delete Flavor',
    responseType: CreateFlavorDto,
    includeBearerAuth: true,
  })
  async remove(@Param('id') id: string) {
    const flavor = await this.flavorService.remove(+id);
    return createResponse(HttpStatus.OK, 'Flavor deleted successfully', flavor);
  }
}
