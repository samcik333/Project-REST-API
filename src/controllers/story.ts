import fetchServices from "../services/fetchService";
import { findAllStories, findComments, findOneStory } from "../services/findService";

const fetchStory = async (ctx:any) => {
    
    const Stories = await fetchServices.fetchService(parseInt(ctx.params.storyid))
    await fetchServices.instertStory(Stories,parseInt(ctx.params.collid))
    await fetchServices.insertComments(Stories,Stories["kids"])
    ctx.response.status = 200

    }

const getAllStoriesOfColl =async (ctx:any) => {
    const stories = await findAllStories(parseInt(ctx.params.collid)) 
    if(stories.length ===0){
        ctx.status = 204
        return
    }
    ctx.body = stories
    ctx.status = 200
}
const getOneStory =async (ctx:any) => {

    const story = await findOneStory(parseInt(ctx.params.collid),parseInt(ctx.params.storyid)) 
    if(!story){
        ctx.status = 404
        return
    }
    ctx.body = story
    ctx.status = 200
}
export default {fetchStory,getAllStoriesOfColl,getOneStory}