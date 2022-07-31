import KoaRouter from 'koa-router'

import verifyToken from '../middlewares/authMiddleware'
import storyController from '../controllers/story'
import verify from '../middlewares/verify'
import storyVerify from '../middlewares/storyVerify'

export default async (router: KoaRouter) => {
    router.post('/users/:userid/collections/:collid/stories/:storyid', verifyToken, verify.verifyUser, verify.verifyCollection, storyVerify, storyController.fetchStory)
    router.get("/users/:userid/collections/:collid/stories", verifyToken, verify.verifyUser, storyController.getAllStoriesOfColl)
    router.get("/users/:userid/collections/:collid/stories/:storyid", verifyToken, verify.verifyUser, storyController.getOneStory)
}