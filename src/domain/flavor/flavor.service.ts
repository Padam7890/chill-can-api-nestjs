import { Injectable } from '@nestjs/common';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { DatabaseService } from 'src/database/database.service';
import { Flavor } from '@prisma/client';

@Injectable()
export class FlavorService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createFlavorDto: CreateFlavorDto) {
    return await this.prisma.flavor.create({
      data: createFlavorDto,
    });
  }

  async findAll() {
    return await this.prisma.flavor.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.flavor.findFirst({
      where: { id },
    });
  }

  async update(id: number, updateFlavorDto: UpdateFlavorDto) {
    return await this.prisma.flavor.update({
      where: { id },
      data: updateFlavorDto,
    });
  }
  

  async remove(id: number) {
    return await this.prisma.flavor.delete({
      where: { id },
    });
  }

  async checkFlavor(flavorName: string): Promise<Flavor | null> {
    return await this.prisma.flavor.findFirst({
      where: {
        flavorName: flavorName,
      },
    });
  }
}
