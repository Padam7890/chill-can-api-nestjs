import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../../database/database.service';
import { Prisma, Role, User } from '@prisma/client';
import { hashPassword } from '../../utils/hash-password';
import { roleEnums } from '../../core/interfaces/types';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne(data.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    data.password = await hashPassword(data.password);
    const userRole = await this.getRoleByName(roleEnums.USER);
    if (!userRole || !userRole.id) {
      throw new BadRequestException('Role not found or role ID is missing');
    }
    const savedata = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        role: {
          connect: {
            id: userRole.id,
          },
        },
      },
    });
    return savedata;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  findOne(email: string) {
    if (!email) {
      throw new BadRequestException('Please provide a valid email');
    }
    return this.prisma.user.findUnique({ where: { email } });
  }

  findoneByid(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });
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

  async getRoleByName(roleName: roleEnums): Promise<Role> {
    return await this.prisma.role.findUnique({
      where: { name: roleName },
    });
  }
  async getRoleNameByid (id: number): Promise<Role> {
    return await this.prisma.role.findUnique({
      where: { id },
    });
  }
}