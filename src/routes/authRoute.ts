import KoaRouter from "koa-router"
import { registerUser, loginUser } from "../controllers/auth"
import { validateUser } from "../middlewares/validate"

export default async (router: KoaRouter) => {
    router.post("/register", validateUser, registerUser)
    router.post("/login", validateUser, loginUser)
}