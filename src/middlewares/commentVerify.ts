import fetch from "node-fetch"
const commentVerify =async (ctx:any,next:any) => {
    const comment = await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${ctx.params.commentid}.json`)).json()
    if(comment['type'] === 'comment'){
        return next()
    }
}
export default commentVerify