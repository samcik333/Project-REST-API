import KoaRouter from "koa-router"
import userController from "../controllers/user"
import verifyToken from "../middlewares/authMiddleware"
import { validateUserForPatch, validateUser } from "../middlewares/validate"
import verify from "../middlewares/verify"

export default async (router: KoaRouter) => {
    router.get("/users", verifyToken, userController.getAllUsers)
    router.get("/users/:userid", verifyToken, userController.getUser)
    router.put("/users/:userid", verifyToken, verify.verifyUser, validateUser, userController.updateUser)
    router.patch("/users/:userid", verifyToken, verify.verifyUser, validateUserForPatch, userController.updateUser)
    router.delete("/users/:userid", verifyToken, verify.verifyUser, userController.deleteUser)
}