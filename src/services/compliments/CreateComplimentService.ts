import { getCustomRepository } from "typeorm";

import { Compliment } from "../../entities/Compliment";
import { ComplimentsRepository } from "../../repositories/ComplimentsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IComplimentsRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentsRequest): Promise<Compliment> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver");
    }

    const userReceiver = await usersRepository.findOne(user_receiver);

    if (!userReceiver) {
      throw new Error("User does not exists");
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
