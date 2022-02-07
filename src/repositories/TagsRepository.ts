import { Repository } from "typeorm";

import { Tag } from "../entities/Tag";

class TagsRepository extends Repository<Tag> {}

export { TagsRepository };
