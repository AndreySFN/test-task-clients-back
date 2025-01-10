import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = super.canActivate(context);
    if (result instanceof Promise) {
      return await result;
    }
    if (result instanceof Observable) {
      return await lastValueFrom(result);
    }
    return result;
  }
}
