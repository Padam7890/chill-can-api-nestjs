import { Injectable } from '@nestjs/common';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { DatabaseService } from 'src/database/database.service';
import { Flavor } from '@prisma/client';

@Injectable()
export class FlavorService {
  constructor(private readonly prisma: DatabaseService) {}
  create(createFlavorDto: CreateFlavorDto) {
    return 'This action adds a new flavor';
  }

  findAll() {
    return `This action returns all flavor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flavor`;
  }

  update(id: number, updateFlavorDto: UpdateFlavorDto) {
    return `This action updates a #${id} flavor`;
  }

  remove(id: number) {
    return `This action removes a #${id} flavor`;
  }

  async checkFlavor(flavorName: string): Promise<Flavor | null> {
    return await this.prisma.flavor.findFirst({
      where: {
        flavorName: flavorName,
      }
    });
}
}
