import { Request, Response } from "express";

import { ListComplimentsSentService } from "../../services/users/ListComplimentsSentService";

class ListComplimentsSentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listComplimentsSentService = new ListComplimentsSentService();

    const compliments = await listComplimentsSentService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListComplimentsSentController };
