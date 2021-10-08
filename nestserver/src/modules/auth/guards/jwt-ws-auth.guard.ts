import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtWsAuthGuard extends AuthGuard('wsjwt') {}