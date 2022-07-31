import KoaRouter from 'koa-router'
import collectionController from '../controllers/collection'
import verifyToken from '../middlewares/authMiddleware'
import { validateCollection } from '../middlewares/validate'
import verify from '../middlewares/verify'

export default async (router: KoaRouter) => {
    router.post("/users/:userid/collections", verifyToken, verify.verifyUser, validateCollection, collectionController.createOne)
    router.get("/users/:userid/collections", verifyToken, verify.verifyUser, collectionController.findAll)
    router.get("/users/:userid/collections/:collid", verifyToken, verify.verifyUser, collectionController.findOne)
    router.put("/users/:userid/collections/:collid", verifyToken, verify.verifyUser, verify.verifyCollection, validateCollection, collectionController.update)
    router.patch("/users/:userid/collections/:collid", verifyToken, verify.verifyUser, verify.verifyCollection, validateCollection, collectionController.update)
    router.delete("/users/:userid/collections/:collid", verifyToken, verify.verifyUser, verify.verifyCollection, collectionController.deleteCollection)
}