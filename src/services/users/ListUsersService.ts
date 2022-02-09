import { instanceToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../../repositories/UsersRepository";

class ListUserService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepository);

    const users = await usersRepositories.find();

    return instanceToPlain(users);
  }
}

export { ListUserService };
