import registerUserService from "../services/registerUserService"
import loginUserService from "../services/loginUserService"
import { findUserByEmail } from "../services/findService"
import showUserWithToken from "../services/jsonParseService"
import createToken from "../services/createTokenService"

const registerUser = async (ctx: any) => {
    const { email, password } = ctx.request.body
    const oldUser = await findUserByEmail(email)

    if (oldUser) {
        return ctx.response.status = 409, ctx.response.body = "User Already Exist. Please Login"
    }

    const user = await registerUserService(email, password)

    ctx.response.status = 201
    ctx.response.body = await showUserWithToken(user)
}

const loginUser = async (ctx: any) => {

    const { email, password } = ctx.request.body
    const user = await findUserByEmail(email)

    if (!user) {
        ctx.response.status = 404
        ctx.body = "User does not exist"
        return
    }

    const logUser = await loginUserService(password, user)

    if (logUser === false) {
        ctx.response.status = 400
        ctx.body = "Invalid email or password"
    }
    else {
        const userWithJWT = await createToken(user)
        ctx.response.status = 200
        ctx.response.body = await showUserWithToken(userWithJWT)
    }

}
export { registerUser, loginUser }