import { Router } from "express";
import IsExistsMiddleware from "../../middleware/isExists";
import { tryCatchMiddleware } from "../../middleware/tryCatch";
import { isAuthenticated } from "../../middleware/isAuth";

import todoController from "../../controllers/todo.controller";
import { Todo } from "../../models/ToDo";
import Validator from "../../middleware/validator";
import todoSchema from "../../middleware/validationSchemas/todoSchema";

const todosRouter: Router = Router();
const isExistsMiddleware = new IsExistsMiddleware(Todo);

todosRouter.get(
  "",
  isAuthenticated,
  tryCatchMiddleware(todoController.getAllTodo.bind(todoController))
);

todosRouter.post(
  "",
  isAuthenticated,
  Validator(todoSchema),
  tryCatchMiddleware(todoController.addTodo.bind(todoController))
);

todosRouter.get(
  "/:id",
  isAuthenticated,
  tryCatchMiddleware(isExistsMiddleware.isExists.bind(isExistsMiddleware)),
  tryCatchMiddleware(todoController.getTodoById.bind(todoController))
);

todosRouter.put(
  "/:id",
  isAuthenticated,
  Validator(todoSchema),
  tryCatchMiddleware(isExistsMiddleware.isExists.bind(isExistsMiddleware)),
  tryCatchMiddleware(todoController.updateTodo.bind(todoController))
);

todosRouter.delete(
  "/:id",
  isAuthenticated,
  tryCatchMiddleware(isExistsMiddleware.isExists.bind(isExistsMiddleware)),
  tryCatchMiddleware(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
