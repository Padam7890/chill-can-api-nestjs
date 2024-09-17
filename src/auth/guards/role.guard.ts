import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
) {}
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User & { role: { name: string } } = request.user; 
    if (!user || !requiredRoles.includes(user.role.name)) {
        throw new UnauthorizedException("You do not have required role to access this resource.");
    }
    return true;
  }
}
