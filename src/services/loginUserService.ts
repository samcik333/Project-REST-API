import bcrypt from "bcryptjs"
import User from "../models/User"

export default async function loginUserService(password: string, user: User) {
    return await bcrypt.compare(password, user.password)
}