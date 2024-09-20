import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from './roles.decorator';

export function Auth(role: string) { 
  return applyDecorators(
    UseGuards(AuthGuard, RoleGuard),
    Roles(role),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }), 
  );
}
