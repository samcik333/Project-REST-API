import User from "../models/User"
import createToken from "./createTokenService"
import cryptPassword from "./cryptPassService"

export default async function registerUserService(email: any, password: any) {
    const encryptedPassword = await cryptPassword(password)

    const user = await User.query().insert({
        email: email.toLowerCase(),
        password: encryptedPassword
    })
    const userWithJWT = createToken(user)
    return userWithJWT
}