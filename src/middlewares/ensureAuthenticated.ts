import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).end();

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(
      token,
      'ea782bab45b1be361975eaf9d59a5cff'
    ) as IPayload;

    req.user_id = sub;

    return next();
  } catch (error) {
    res.status(401).end();
  }
}

export { ensureAuthenticated };
