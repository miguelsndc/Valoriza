import { getCustomRepository } from 'typeorm';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

class ListUserReceivedComplimentsService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const receivedCompliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    });

    return receivedCompliments;
  }
}

export { ListUserReceivedComplimentsService };
