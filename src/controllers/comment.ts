import { findComments, findOneComment, findOneStory, findOneUser } from "../services/findService"

const getComments =async (ctx:any) => {
    const story = await findOneStory(parseInt(ctx.params.collid),parseInt(ctx.params.storyid)) 
    if(!story){
        ctx.status = 404
        return
    }
    const comments = await findComments(parseInt(ctx.params.storyid))
    if(comments.length ===0){
        ctx.status = 204
        return
    }
    ctx.body = comments
    ctx.status = 200
}
const getOneComment =async (ctx:any) => {
    const story = await findOneStory(parseInt(ctx.params.collid),parseInt(ctx.params.storyid)) 
    if(!story){
        ctx.status = 404
        return
    }
    const comment = await findOneComment(parseInt(ctx.params.storyid),parseInt(ctx.params.storyid))
    if(!comment){
        ctx.status = 404
        return
    }
    ctx.body = comment
    ctx.status = 200
}
export default {getComments,getOneComment}