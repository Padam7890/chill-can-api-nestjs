// src/common/decorators/universal.decorator.ts

import { applyDecorators, CanActivate, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { Permissions } from './permissions.decorator';

interface UniversalDecoratorOptions {
  role?: string;          // Optional role
  permissions?: string[]; // Optional permissions
  summary: string;
  responseType: any;
  includeBearerAuth?: boolean; // Optional API Bearer Auth
  guards?: any; // Optional guards
}

export function UniversalDecorator({
  role,
  permissions,
  summary,
  responseType,
  includeBearerAuth = false,
  guards = [], // Default to empty array
}: UniversalDecoratorOptions) {
  // Create an array to hold decorators conditionally
  const decorators = [];

  // Add ApiBearerAuth if specified
  if (includeBearerAuth) {
    decorators.push(ApiBearerAuth('JWT-auth'));
  }

  // Add ApiOperation and ApiResponse decorators
  decorators.push(
    ApiOperation({ summary }),
    ApiResponse({ type: responseType }),
  );

  // Add Roles decorator if specified
  if (role) {
    decorators.push(Roles(role));
  }

  // Add Permissions decorator if specified
  if (permissions) {
    decorators.push(Permissions(...permissions));
  }

  // Add guards if specified
  if (guards.length > 0) {
    decorators.push(UseGuards(...guards));
  }

  // Apply all decorators
  return applyDecorators(...decorators);
}
