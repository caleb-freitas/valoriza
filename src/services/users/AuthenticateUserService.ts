import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../../repositories/UsersRepository";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error("Password or email invalid");
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new Error("Password or email invalid");
    }

    const token = sign(
      { email: user.email },
      "1d2d0956162f035710f26ec6067df161",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
