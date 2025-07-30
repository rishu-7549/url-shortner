import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('JwtAuthGuard - isPublic:', isPublic);
    console.log('JwtAuthGuard - route:', context.getHandler().name);

    if (isPublic) {
      console.log('JwtAuthGuard - skipping authentication for public route');
      return true;
    }

    console.log('JwtAuthGuard - requiring authentication');

    // Get the request object to check headers
    const request = context.switchToHttp().getRequest();
    console.log(
      'JwtAuthGuard - Authorization header:',
      request.headers.authorization,
    );
    console.log('JwtAuthGuard - All headers:', Object.keys(request.headers));

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      console.log(' wtAuthGuard - Authentication failed');
      throw err || new Error('Authentication failed');
    }

    console.log('JwtAuthGuard - Authentication successful');
    return user;
  }
}
