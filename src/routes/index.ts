import KoaRouter from 'koa-router'
import authRoute from './authRoute'
import collectionRoute from './collectionRoute'
import storyRoute from './storyRoute'
import usersRoute from './usersRoute'
import commentRoute from './commentRoute'

export default async (router: KoaRouter) => {
    await authRoute(router)
    await usersRoute(router)
    await collectionRoute(router)
    await storyRoute(router)
    await commentRoute(router)
}