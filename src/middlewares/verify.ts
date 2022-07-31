import jwtDecode from "jwt-decode"
import { findOneCollection } from "../services/findService"

const verifyUser = async (ctx: any, next: any) => {
    const token = ctx.request.body.token || ctx.request.query.token || ctx.request.headers["access-token"]

    const decoded: object = await jwtDecode(token)
    const tokenId = Object.values(decoded)
    const userId = parseInt(ctx.params.userid)

    if (userId === tokenId[0]) {
        return next()
    }
    ctx.response.status = 401
    ctx.response.body = "You are not allowed to do this method"

}
const verifyCollection = async (ctx: any, next: any) => {

    const userid = parseInt(ctx.params.userid)
    const collid = ctx.params.collid
    const coll = await findOneCollection(collid)

    if (coll?.ownerId === userid) {
        return next()
    }
    ctx.response.body = "The collection doesnt exist or you dont have permission for it"
    ctx.response.status = 401

}
export default { verifyUser, verifyCollection }