import Collection from "../models/Collection"
import User from "../models/User"
import { deleteOneUser } from "../services/deleteService"
import { beforeDeleteFindStories,beforUserDeleteFindStories, checkIfDeleteStory } from "../services/afterDeleteService"
import { findAllUsers, findOneUser } from "../services/findService"
import { updateOneUser } from "../services/updateService"

const getAllUsers = async (ctx: any) => {
    const users = await findAllUsers()
    return ctx.request.status = 200, ctx.response.body = users
}
const getUser = async (ctx: any) => {
    const user = await findOneUser(parseInt(ctx.params.userid))
    if (user) {
        return ctx.response.status = 200, ctx.response.body = user
    }
}
const updateUser = async (ctx: any) => {
    const { email, password } = ctx.request.body

    try {
        await updateOneUser(email,password, parseInt(ctx.params.userid))
        ctx.status = 200
        ctx.response.body = "User successfully updated"
    }
    catch (err) {
        ctx.body = err
    }
}
const deleteUser = async (ctx: any) => {
    const user = await findOneUser(parseInt(ctx.params.userid))
    const colls = await beforUserDeleteFindStories(ctx)
    try {
        await deleteOneUser(user?.email)
        ctx.status = 200
        ctx.response.body = "User was successfully deleted"
    } catch (error) {
        ctx.body = error
    }
    await checkIfDeleteStory(colls)
}
export default { getAllUsers, getUser, updateUser, deleteUser }