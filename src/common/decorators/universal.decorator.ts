import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { Permissions } from './permissions.decorator';
import { Auth } from './auth.decorator';

interface UniversalDecoratorOptions {
  role?: string; // Optional role
  permissions?: string[]; // Optional permissions
  summary: string;
  responseType: any;
  body?: any; //
  includeBearerAuth?: boolean; // Optional API Bearer Auth
  guards?: any; // Optional guards
}

export function UniversalDecorator({
  role,
  permissions,
  summary,
  responseType,
  includeBearerAuth = false,
  body,
  guards = [], // Default to empty array
}: UniversalDecoratorOptions) {
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

  if (body) {
    decorators.push(
      ApiBody({
        schema: {
          type: 'object',
          properties: body,
        },
      }),
    );
  }

  // Add Roles decorator if specified
  if (role) {
    decorators.push(Auth(role));
  }

  // Add Permissions decorator if specified
  if (permissions) {
    decorators.push(Permissions(...permissions));
  }

  // Add custom guards if specified
  if (guards.length > 0) {
    decorators.push(UseGuards(...guards));
  }

  // Apply all decorators
  return applyDecorators(...decorators);
}
