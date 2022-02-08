import { hash } from "bcryptjs";
import * as EmailValidator from "email-validator";
import { getCustomRepository } from "typeorm";

import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IUSerRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUSerRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Email incorrect");
    }

    if (!password) {
      throw new Error("Invalid password");
    }

    const emailIsValid = EmailValidator.validate(email);

    if (!emailIsValid) {
      throw new Error("Invalid email");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
