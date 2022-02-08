import { getCustomRepository } from "typeorm";

import { Compliment } from "../../entities/Compliment";
import { ComplimentsRepository } from "../../repositories/ComplimentsRepository";

class ListComplimentsReceivedService {
  async execute(user_id: string): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id,
      },
    });

    return compliments;
  }
}

export { ListComplimentsReceivedService };
