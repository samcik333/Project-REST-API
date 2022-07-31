import Collection from "../Models/Collection"
import Story from "../Models/Story"
import User from "../Models/User"

export const beforeDeleteFindStories = async (ctx: any) => {
    const collectons = await Collection.relatedQuery('stories').for(ctx.params.collid)
    let stories = []
    for (let i = 0; i < collectons.length; i++) {
        stories.push(collectons[i].$id())
    }
    return stories
}
export const beforUserDeleteFindStories = async (ctx: any) => {
    const collectons = await User.relatedQuery('collects').for(ctx.params.userid)
    let colls = []
    for (let i = 0; i < collectons.length; i++) {
        const collId = await Collection.relatedQuery('stories').for(collectons[i].$id())
        for (let j = 0; j < collId.length; j++) {
            if (colls) {

            }
            colls.push(collId[j].$id())
        }
    }
    return colls
}
export const checkIfDeleteStory = async (stories: any) => {
    for (let i = 0; i < stories.length; i++) {
        const collectons = await Story.relatedQuery('collections').for(stories[i])
        if (collectons.length === 0) {
            await Story.query().findById(stories[i]).delete()
        }
    }
}