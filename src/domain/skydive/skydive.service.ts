import { Injectable } from '@nestjs/common';
import { CreateSkydiveDto } from './dto/create-skydive.dto';
import { UpdateSkydiveDto } from './dto/update-skydive.dto';

@Injectable()
export class SkydiveService {
  create(createSkydiveDto: CreateSkydiveDto) {
    return 'This action adds a new skydive';
  }

  findAll() {
    return `This action returns all skydive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skydive`;
  }

  update(id: number, updateSkydiveDto: UpdateSkydiveDto) {
    return `This action updates a #${id} skydive`;
  }

  remove(id: number) {
    return `This action removes a #${id} skydive`;
  }
}
