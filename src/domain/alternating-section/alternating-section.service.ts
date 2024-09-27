import { Injectable } from '@nestjs/common';
import { CreateAlternatingSectionDto } from './dto/create-alternating-section.dto';
import { UpdateAlternatingSectionDto } from './dto/update-alternating-section.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()

export class AlternatingSectionService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createAlternatingSectionDto: CreateAlternatingSectionDto) {
    const alternatingSection = await this.prisma.alternatingSection.create({
      data: createAlternatingSectionDto,
    });

    return alternatingSection;
  }

  async findAll() {
    const alternatingSection = await this.prisma.alternatingSection.findMany();
    return alternatingSection;
  }

  async findOne(id: number) {
    const alternatingSection = await this.prisma.alternatingSection.findUnique({
      where: { id },
    });
    return alternatingSection;
  }

  async update(id: number, updateAlternatingSectionDto: UpdateAlternatingSectionDto) {
    const alternatingSection = await this.prisma.alternatingSection.update({
      where: { id },
      data: updateAlternatingSectionDto,
    });
    return alternatingSection;
  }

  async remove(id: number) {
    const alternatingSection = await this.prisma.alternatingSection.delete({
      where: { id },
    });
    return alternatingSection;
  }
}
