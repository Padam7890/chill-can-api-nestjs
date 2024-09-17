import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User & { role: { permissions: { name: string }[] } } =
      request.user;
    if (
      !user ||
      !this.hasRequiredPermissions(user.role.permissions, requiredPermissions)
    ) {
      throw new UnauthorizedException(
        'You do not have the required permissions to access this resource',
      );
    }
    return true;
  }

  private hasRequiredPermissions(
    userPermissions: { name: string }[],
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.every((permission) =>
      userPermissions.some(
        (userPermission) => userPermission.name === permission,
      ),
    );
  }
}
