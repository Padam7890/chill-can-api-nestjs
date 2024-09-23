import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkydiveDto } from './dto/create-skydive.dto';
import { UpdateSkydiveDto } from './dto/update-skydive.dto';
import { DatabaseService } from '../../database/database.service';
import { FlavorService } from '../flavor/flavor.service';

@Injectable()
export class SkydiveService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly flavorService: FlavorService,
  ) {}
  async create(createSkydiveDto: CreateSkydiveDto) {
    const flavor = await this.flavorService.checkFlavor(
      createSkydiveDto.flavorName,
    );
    const skydive = await this.prisma.skydive.create({
      data: {
        title: createSkydiveDto.title,
        flavor: flavor
          ? {
              connect: {
                id: flavor.id,
              },
            }
          : {
              create: {
                flavorName: createSkydiveDto.flavorName,
              },
            },
      },
    });
    return skydive;
  }

  async findAll() {
    return await this.prisma.skydive.findMany({
      include: {
        flavor: true,
      },
    });
  }

  async findOne(id: number) {
    const skydive = await this.prisma.skydive.findUnique({
      where: {
        id,
      },
      include: {
        flavor: true,
      },
    });
    if (!skydive) {
      throw new NotFoundException('SkyDive not found');
    }
    return skydive;
  }

  async update(id: number, updateSkydiveDto: UpdateSkydiveDto) {
    const skydive = await this.prisma.skydive.findUnique({
      where: {
        id,
      },
    });
    if (!skydive) {
      throw new NotFoundException('SkyDive not found');
    }
    const flavor = await this.flavorService.checkFlavor(
      updateSkydiveDto.flavorName,
    );
    if (!flavor) {
      throw new NotFoundException('Flavor not found');
    }

    const updatedSkydive = await this.prisma.skydive.update({
      where: {
        id,
      },
      data: {
        title: updateSkydiveDto.title,
        flavor: {
          connect: {
            id: flavor.id,
          },
        },
      },
    });
    return updatedSkydive;
  }

  async remove(id: number) {
    const skydive = await this.prisma.skydive.findUnique({
      where: {
        id,
      },
    });
    if (!skydive) {
      throw new NotFoundException('SkyDive not found');
    }
    return await this.prisma.skydive.delete({
      where: { id },
    });
  }
}
