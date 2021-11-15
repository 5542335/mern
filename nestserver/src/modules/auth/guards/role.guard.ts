import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private userService: UserService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { query: { token } } = context.switchToHttp().getRequest();

    const { role: roles } = await this.userService.getUser(token)

    console.log(roles)


    return requiredRoles.some((role) => roles.includes(role));
  }
}