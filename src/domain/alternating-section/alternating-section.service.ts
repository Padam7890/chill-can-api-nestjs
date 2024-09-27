import { Injectable } from '@nestjs/common';
import { CreateAlternatingSectionDto } from './dto/create-alternating-section.dto';
import { UpdateAlternatingSectionDto } from './dto/update-alternating-section.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()

// model AlternatingSection {
//   id        Int      @id @default(autoincrement())
//   title     String
//   content   String
//   flavor    Flavor   @relation(fields: [flavorId], references: [id])
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   flavorId  Int
// }
export class AlternatingSectionService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createAlternatingSectionDto: CreateAlternatingSectionDto) {
    const alternatingSection = await this.prisma.alternatingSection.create({
      data: createAlternatingSectionDto,
    });

    return alternatingSection;
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
