// installed only types
// eslint-disable-next-line import/no-unresolved
import { JwtPayload as JSONWebTokenPayload } from 'jsonwebtoken';
import { JWTPayload } from './JWTPayload';

export type JWTPayloadDecoded = JWTPayload & JSONWebTokenPayload;
