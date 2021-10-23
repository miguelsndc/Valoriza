import { getCustomRepository } from 'typeorm';
import { TagsRepository } from '../repositories/TagsRepository';

class CreateTagService {
  async execute(name: string) {
    if (!name.trim()) {
      throw new Error('Name field is required');
    }

    const tagsRepository = getCustomRepository(TagsRepository);

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error('Tag already exists');
    }

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
