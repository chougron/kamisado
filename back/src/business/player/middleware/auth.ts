import jwt from 'express-jwt';
import { getAuthCookie, JWT_SECRET } from '../service/jwt';

export default jwt({
  secret: JWT_SECRET,
  getToken: getAuthCookie,
});
