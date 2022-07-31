import KoaRouter from 'koa-router'

import verifyToken from '../middlewares/authMiddleware'
import storyController from '../controllers/story'
import commentController from '../controllers/comment'
import verify from '../middlewares/verify'
import storyVerify from '../middlewares/storyVerify'
import commentVerify from '../middlewares/commentVerify'

export default async (router: KoaRouter) => {
    router.get("/users/:userid/stories/:storyid/comments", verifyToken, verify.verifyUser, commentController.getComments)
    router.get("/users/:userid/stories/:storyid/comments/:commentid", verifyToken, verify.verifyUser, commentVerify, commentController.getOneComment)
}           