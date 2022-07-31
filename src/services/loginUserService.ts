import bcrypt from "bcryptjs"
import User from "../Models/User"

export default async function loginUserService(password: string, user: User) {
    return await bcrypt.compare(password, user.password)
}