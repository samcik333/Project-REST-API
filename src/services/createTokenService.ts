import jwt from "jsonwebtoken";
import User from "../models/User";

export default async function createToken(user: User) {
   const token = jwt.sign({ user_id: user.id }, "login", { expiresIn: "1h" })
   user.token = token
   return user
}