import { Router } from "express";
import { tryCatchMiddleware } from "../../middleware/tryCatch";
import userController from "../../controllers/user.controller";
import { isAuthenticated } from "../../middleware/isAuth";
import IsExistsMiddleware from "../../middleware/isExists";
import { User } from "../../models/User";

const router: Router = Router();
const isExistsMiddleware = new IsExistsMiddleware(User);

router.post(
  "/signup",
  tryCatchMiddleware(isExistsMiddleware.isExists.bind(isExistsMiddleware)),
  tryCatchMiddleware(userController.signUp.bind(userController))
);
router.post(
  "/login",
  tryCatchMiddleware(userController.login.bind(userController))
);

router.get(
  "/profile",
  isAuthenticated,
  tryCatchMiddleware(userController.getUser.bind(userController))
);
router.put(
  "/",
  isAuthenticated,
  tryCatchMiddleware(userController.updateUser.bind(userController))
);

router.put(
  "/password",
  isAuthenticated,
  tryCatchMiddleware(userController.updatePassword.bind(userController))
);

export default router;
