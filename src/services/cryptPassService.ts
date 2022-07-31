import bcrypt from "bcryptjs"

export default async function cryptPassword(password: string) {
    return await bcrypt.hash(password, 10)
}
