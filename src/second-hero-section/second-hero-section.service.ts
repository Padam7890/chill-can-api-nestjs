import { Injectable } from '@nestjs/common';
import { CreateSecondHeroSectionDto } from './dto/create-second-hero-section.dto';
import { UpdateSecondHeroSectionDto } from './dto/update-second-hero-section.dto';
import { DatabaseService } from 'src/database/database.service';
import { SecondaryHeroSection } from '@prisma/client';

@Injectable()
export class SecondHeroSectionService {
  constructor (private readonly prisma:DatabaseService) {}

  async create(createSecondHeroSectionDto: CreateSecondHeroSectionDto):Promise<SecondaryHeroSection> {
    return await this.prisma.secondaryHeroSection.create({
      data: createSecondHeroSectionDto,
    });
  }

  findAll() {
    return `This action returns all secondHeroSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secondHeroSection`;
  }

  update(id: number, updateSecondHeroSectionDto: UpdateSecondHeroSectionDto) {
    return `This action updates a #${id} secondHeroSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} secondHeroSection`;
  }
}
