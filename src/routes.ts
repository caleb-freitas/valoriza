import { Router } from "express";

import { CreateComplimentController } from "./controllers/compliments/CreateComplimentController";
import { CreateTagController } from "./controllers/tags/CreateTagController";
import { ListTagsController } from "./controllers/tags/LIstTagsController";
import { AuthenticateUserController } from "./controllers/users/AuthenticateUserController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { ListComplimentsReceivedController } from "./controllers/users/ListComplimentsReceivedController";
import { ListComplimentsSentController } from "./controllers/users/ListComplimentsSentController";
import { ListUsersController } from "./controllers/users/ListUsersService";
import { ensureAdmin } from "./middleware/ensureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplimentsReceivedController =
  new ListComplimentsReceivedController();
const listComplimentsSentController = new ListComplimentsSentController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

routes.post("/users", createUserController.handle);

routes.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

routes.post("/login", authenticateUserController.handle);

routes.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

routes.get(
  "/users/compliments/sent",
  ensureAuthenticated,
  listComplimentsSentController.handle
);

routes.get(
  "/users/compliments/received",
  ensureAuthenticated,
  listComplimentsReceivedController.handle
);

routes.get("/tags", ensureAuthenticated, listTagsController.handle);

routes.get("/users", ensureAuthenticated, listUsersController.handle);

export { routes };
