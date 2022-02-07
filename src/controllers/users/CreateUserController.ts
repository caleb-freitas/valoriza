import { Request, Response } from "express";

import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, admin } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      admin,
    });
    return response.json(user);
  }
}

export { CreateUserController };
