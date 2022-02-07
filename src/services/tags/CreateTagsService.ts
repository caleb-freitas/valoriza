import { getCustomRepository } from "typeorm";

import { Tag } from "../../entities/Tag";
import { TagsRepository } from "../../repositories/TagsRepository";

class CreateTagsService {
  async execute(name: string): Promise<Tag> {
    const tagsRepository = getCustomRepository(TagsRepository);
    if (!name) {
      throw new Error("Incorrect name");
    }
    const tagsAlreadyExists = await tagsRepository.findOne({
      name,
    });
    if (tagsAlreadyExists) {
      throw new Error("Tag already exists");
    }
    const tag = await tagsRepository.create({
      name,
    });
    await tagsRepository.save(tag);
    return tag;
  }
}

export { CreateTagsService };
