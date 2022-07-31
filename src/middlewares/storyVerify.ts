import fetch from "node-fetch"
const storyVerify =async (ctx:any,next:any) => {
    const story = await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${ctx.params.storyid}.json`)).json()
    if(story['type'] === 'story'){
        return next()
    }
}
export default storyVerify