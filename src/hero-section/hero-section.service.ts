import { Injectable } from '@nestjs/common';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { MainHeroSection } from '@prisma/client';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HeroSectionService {
  constructor(private prisma: DatabaseService) {}

  async create(createHeroSectionDto: CreateHeroSectionDto):Promise<MainHeroSection> {
    return await this.prisma.mainHeroSection.create({
      data: createHeroSectionDto,
    });
  }

  async findAll():Promise<MainHeroSection[]> {
    return await this.prisma.mainHeroSection.findMany();
  }

  async findOne(id: number):Promise<MainHeroSection> {
    return await this.prisma.mainHeroSection.findFirst({
      where: { id },
    });
  }

  async update(id: number, updateHeroSectionDto: UpdateHeroSectionDto) {
    return await this.prisma.mainHeroSection.update({
      where: { id },
      data: updateHeroSectionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.mainHeroSection.delete({
      where: { id },
    });
  }
}
