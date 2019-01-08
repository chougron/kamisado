import express from 'express';
import * as jwt from 'jsonwebtoken';

if (typeof process.env.JWT_SECRET !== 'string') {
  throw new Error('Missing env variable JWT_SECRET');
}

export const JWT_SECRET = process.env.JWT_SECRET;
const JWT_MAX_AGE_IN_SECONDS = 3600 * 24; // 1 day
const COOKIE_NAME = 'authToken';

export function createTokenForPlayer(playerId: number): string {
  return jwt.sign({ playerId }, JWT_SECRET, {
    expiresIn: JWT_MAX_AGE_IN_SECONDS,
  });
}

export function setAuthCookie(res: express.Response, authToken: string) {
  res.append('Set-Cookie', `${COOKIE_NAME}=${authToken}; Path=/; HttpOnly`);
}

export function getAuthCookie(req: express.Request): string | null {
  return req.cookies[COOKIE_NAME] || null;
}
