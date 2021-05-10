import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class BuyerAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest()
    return !!request.session?.userId && request.session?.role === 'buyer'
  }
}
