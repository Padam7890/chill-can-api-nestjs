import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { RoleGuard } from '../../core/guards/role.guard';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';

export function Auth(role: string) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RoleGuard),
    Roles(role),
    ApiBearerAuth(),
  );
}
