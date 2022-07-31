import Collection from "../models/Collection"
import User from "../models/User"

export async function deleteOneUser(email: any) {
    return await User.query().where("email", email).delete()
}
export async function deleteOneColl(name: any) {
    return await Collection.query().where("name", name).delete()
}