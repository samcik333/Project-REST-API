import Collection from "../models/Collection";
import User from "../models/User";
import cryptPassword from "./cryptPassService";

export async function updateOneUser(email: string, password: string, id: number) {
    if (password) {
        password = await cryptPassword(password)
    }
    return await User.query().findById(id).update({ email, password })
}
export async function updateOneCollection(name: string, id: number) {

    return await Collection.query().findById(id).update({ name })
}