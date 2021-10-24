import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const { tag_id, user_sender, user_receiver, message } = req.body;

    const createComplimentService = new CreateComplimentService();
    const compliment = await createComplimentService.execute({
      message,
      tag_id,
      user_receiver,
      user_sender,
    });

    res.json(compliment);
  }
}

export { CreateComplimentController };
