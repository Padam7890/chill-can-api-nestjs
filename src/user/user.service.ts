import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, User } from '@prisma/client';
import { hashPassword } from 'src/utils/hash-password';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne(data.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    data.password = await hashPassword(data.password);
    const savedata = await this.prisma.user.create({
      data,
    });
    return savedata;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    if (!email) {
      throw new BadRequestException('Please provide a valid email');
    }
    return this.prisma.user.findUnique({ where: { email } });
  }

  findoneByid(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
