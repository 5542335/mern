import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const extractToken = (client) => {
  return client.handshake.query.token;
}

@Injectable()
export class JwtWsStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractToken]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    return { id: payload.token, email: payload.email };
  }
}
