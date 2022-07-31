import createCollection from "../services/createService"
import { deleteOneColl } from "../services/deleteService"
import { beforeDeleteFindStories, checkIfDeleteStory } from "../services/afterDeleteService"
import { findAllCollections, findOneCollection } from "../services/findService"
import { updateOneCollection } from "../services/updateService"

const createOne = async (ctx: any) => {
    const { name } = ctx.request.body
    try {
        await createCollection(name, parseInt(ctx.params.userid))

        ctx.response.status = 201
        ctx.response.body = "Collection successfully created"
    }
    catch (error) {
        ctx.body = error
    }
}
const findAll = async (ctx: any) => {
    ctx.body = await findAllCollections()
}
const findOne = async (ctx: any) => {
    const coll = await findOneCollection(parseInt(ctx.params.collid))

    if (coll) {
        ctx.body = await findOneCollection(parseInt(ctx.params.collid))
    }
}
const update = async (ctx: any) => {
    const { name } = ctx.request.body
    try {
        await updateOneCollection(name, parseInt(ctx.params.collid))
        ctx.status = 200
        ctx.response.body = "Collection successfully updated"
    }
    catch (err) {
        ctx.body = err
    }
}
const deleteCollection = async (ctx: any) => {
    const coll = await findOneCollection(parseInt(ctx.params.collid))
    const stories = await beforeDeleteFindStories(ctx)
    
    try {
        await deleteOneColl(coll?.name)
        ctx.status = 200
        ctx.response.body = "Collection was successfully deleted"
    } catch (error) {
        ctx.body = error
    }
    await checkIfDeleteStory(stories)
}
export default { createOne, findAll, findOne, update, deleteCollection }