import { Injectable } from '@nestjs/common';
import { CreateAlternatingSectionDto } from './dto/create-alternating-section.dto';
import { UpdateAlternatingSectionDto } from './dto/update-alternating-section.dto';

@Injectable()
export class AlternatingSectionService {
  create(createAlternatingSectionDto: CreateAlternatingSectionDto) {
    return 'This action adds a new alternatingSection';
  }

  findAll() {
    return `This action returns all alternatingSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alternatingSection`;
  }

  update(id: number, updateAlternatingSectionDto: UpdateAlternatingSectionDto) {
    return `This action updates a #${id} alternatingSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} alternatingSection`;
  }
}
