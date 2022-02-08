import { Router } from "express";

import { CreateComplimentController } from "./controllers/compliments/CreateComplimentController";
import { CreateTagController } from "./controllers/tags/CreateTagController";
import { AuthenticateUserController } from "./controllers/users/AuthenticateUserController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { ensureAdmin } from "./middleware/ensureAdmin";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

routes.post("/users", createUserController.handle);
routes.post("/tags", ensureAdmin, createTagController.handle);
routes.post("/login", authenticateUserController.handle);
routes.post("/compliments", createComplimentController.handle);

export { routes };
