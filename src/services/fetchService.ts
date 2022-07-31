import fetch from "node-fetch"
import Collection from "../Models/Collection"
import Comment from "../Models/Comment"
import Story from "../Models/Story"
async function fetchService(storyid: any) {
    return await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyid}.json`)).json()
}
async function instertStory(fetchStory: any, collid: any) {
    const writeStory = await Story.query().where('id', fetchStory['id'])
    if (writeStory.length === 0) {
        await Story.query().insert({
            id: fetchStory['id'],
            title: fetchStory['title'],
            time: fetchStory['time'],
            author: fetchStory['by']
        })
    }
    const collectons = await Collection.relatedQuery('stories').for(collid)
    let story
    for (let i = 0; i < collectons.length; i++) {
        if (collectons[i].$id() === fetchStory['id']) {
            story = collectons[i]
        }
    }
    if (!story) {
        await Collection.relatedQuery('stories').for(collid).relate(fetchStory['id'])
    }

}
async function insertComments(fetchStory: any, kids: any) {
    let comments = kids
    let fetchedComment
    if (comments && comments.length !== 0) {
        const writenComment = await Comment.query().findById(comments[comments.length - 1])
        fetchedComment = await fetchService(comments[comments.length - 1])
        if (!writenComment) {
            await Story.relatedQuery("comments").for(fetchStory['id']).insert({
                id: fetchedComment['id'],
                time: fetchedComment['time']
            })
            const parent = await Comment.query().where('id', fetchedComment['parent'])
            const cild = await Comment.query().findById(fetchedComment['id'])
            if (parent.length !== 0) {
                await cild?.$relatedQuery('parent').relate(parent)
            }
        }
        if (fetchedComment["kids"]) {
            await insertComments(fetchStory, fetchedComment["kids"])
            comments.pop()
            await insertComments(fetchStory, comments)
        }
        else {
            comments.pop()
            await insertComments(fetchStory, comments)
        }
    }
}

export default { fetchService, instertStory, insertComments }