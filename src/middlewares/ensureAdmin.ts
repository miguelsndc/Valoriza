import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req;

  const usersRepository = getCustomRepository(UsersRepository);

  const { admin } = await usersRepository.findOne(user_id);

  if (!admin) return res.status(401).end();

  return next();
}

export { ensureAdmin };
