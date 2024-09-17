import { Injectable } from '@nestjs/common';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';

@Injectable()
export class HeroSectionService {
  create(createHeroSectionDto: CreateHeroSectionDto) {
    return 'This action adds a new heroSection';
  }

  findAll() {
    return `This action returns all heroSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} heroSection`;
  }

  update(id: number, updateHeroSectionDto: UpdateHeroSectionDto) {
    return `This action updates a #${id} heroSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} heroSection`;
  }
}
