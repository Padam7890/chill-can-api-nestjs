import { Injectable, ParseIntPipe } from '@nestjs/common';
import { CreateSecondHeroSectionDto } from './dto/create-second-hero-section.dto';
import { UpdateSecondHeroSectionDto } from './dto/update-second-hero-section.dto';
import { DatabaseService } from 'src/database/database.service';
import { SecondaryHeroSection } from '@prisma/client';

@Injectable()
export class SecondHeroSectionService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(
    createSecondHeroSectionDto: CreateSecondHeroSectionDto,
  ): Promise<SecondaryHeroSection> {
    return await this.prisma.secondaryHeroSection.create({
      data: createSecondHeroSectionDto,
    });
  }

  async findAll() {
    return await this.prisma.secondaryHeroSection.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.secondaryHeroSection.findFirst({
      where: { id },
    });
  }

  async update(
    id: number,
    updateSecondHeroSectionDto: UpdateSecondHeroSectionDto,
  ) {
    return await this.prisma.secondaryHeroSection.update({
      where: { id },
      data: updateSecondHeroSectionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.secondaryHeroSection.delete({
      where: { id },
    });
  }
}
