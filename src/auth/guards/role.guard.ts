import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User & { role: { name: string } } = request.user;
    console.log(request);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    const getUserByEmail: User = await this.userService.findOne(user.email);
    const getRoleNamebyid: Role = await this.userService.getRoleNameByid(
      getUserByEmail.roleId,
    );

    console.log(getUserByEmail);

    if (!user || !requiredRoles.includes(getRoleNamebyid.name)) {
      throw new UnauthorizedException(
        'You do not have required role to access this resource.',
      );
    }
    return true;
  }
}
