import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
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
  guards = [], 
}: UniversalDecoratorOptions) {
  const decorators = [];

  if (includeBearerAuth) {
    decorators.push(ApiBearerAuth('JWT-auth'));
  }

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

  if (role) {
    decorators.push(Auth(role));
  }

  if (permissions) {
    decorators.push(Permissions(...permissions));
  }

  if (guards.length > 0) {
    decorators.push(UseGuards(...guards));
  }

  return applyDecorators(...decorators);
}
