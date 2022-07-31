import Collection from "../Models/Collection"
import User from "../Models/User"

export async function deleteOneUser(email: any) {
    return await User.query().where("email", email).delete()
}
export async function deleteOneColl(name: any) {
    return await Collection.query().where("name", name).delete()
}