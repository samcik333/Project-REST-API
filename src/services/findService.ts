import Collection from "../Models/Collection"
import Story from "../Models/Story"
import User from "../Models/User"

export async function findUserByEmail(email: string) {
    return await User.query().findOne({ email })
}
export async function findAllUsers(){
    return await User.query().select('id', 'email')
}
export async function findOneUser(id: number) {
    return await User.query().select('id', 'email').findById(id)
}
export async function findAllCollections() {
    return await Collection.query()
}
export async function findOneCollection(collId: number) {
    return await Collection.query().findById(collId)
}
export async function findAllStories(collid:number) {
    return await Collection.relatedQuery('stories').for(collid)
}
export async function findOneStory(collid:number,storyid: number) {
    return await Collection.relatedQuery('stories').for(collid).findById(storyid)
}
export async function findComments(storyid: number) {
    return await Story.relatedQuery('comments').for(storyid)
}
export async function findOneComment(storyid: number,commentid: number) {
    return await Story.relatedQuery('comments').for(storyid).findById(commentid)
}