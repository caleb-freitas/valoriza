import { Router } from "express";

import { CreateTagController } from "./controllers/tags/CreateTagController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { ensureAdmin } from "./middleware/ensureAdmin";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

routes.post("/users", createUserController.handle);
routes.post("/tags", ensureAdmin, createTagController.handle);

export { routes };
