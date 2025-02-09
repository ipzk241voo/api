import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (!user || !user.roles) {
      return false;
    }

    if (user.roles.includes('ADMIN')) {
      return true;
    }

    return roles.some(role => user.roles.includes(role));
  }
}