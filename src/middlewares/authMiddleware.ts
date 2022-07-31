import jwt from "jsonwebtoken"

const verifyToken = async (ctx: any, next: any) => {
    const token = ctx.request.body.token || ctx.request.query.token || ctx.request.headers["access-token"]
    if (!token) {
        return ctx.response.status = 403, ctx.response.body = "A token is required for authentication"
    }
    try {
        const decoded = jwt.verify(token, "login")
        ctx.request.user = decoded
    } catch (err) {
        return ctx.response.status = 401, ctx.response.body = "Invalid Token"
    }
    return next()
}
export default verifyToken