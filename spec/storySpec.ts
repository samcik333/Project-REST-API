import supertest from "supertest"
import Collection from "../src/Models/Collection"
import Story from "../src/Models/Story"
import User from "../src/Models/User"
import { server } from "../src/server"

const req = supertest(server)

describe("Test Collection Logic", async () => {
    const user1 = {
        email: "test1@gmail.com",
        password: "123456789"
    } as User
    const coll1 = {
        name: "Collection1"
    } as Collection

    let token1 = ""
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
        const res1 = await req.post("/register").send({
            email: user1.email,
            password: user1.password
        })
        token1 = res1.body.token
        const userId1 = await User.query().where('email', user1.email)
        await req.post(`/users/${userId1[0].id}/collections`).send({
            name: coll1.name,
            token: token1
        })
    })
    beforeEach(async()=>{
        const userId = await User.query().where("email", user1.email)
        const collId = await Collection.query().where("name", coll1.name)
        await req.post(`/users/${userId[0].id}/collections/${collId[0].id}/stories/7608`).send({
            token: token1
        })
        await req.post(`/users/${userId[0].id}/collections/${collId[0].id}/stories/1`).send({
            token: token1
        })
    })
    afterEach(async()=>{
        await Story.query().findById(7608).delete()
    })
    afterAll(async () => {
        const userId1 = await User.query().where('email', user1.email)
        await req.delete(`/users/${userId1[0].id}`).send({
            token: token1
        })
        server.close()
    })
    it("POST /users/:userId/collections/:collid/stories/7628 Should fetch story", async () => {
        const story = await Story.query().findById(7608)
        expect(story?.id).toBe(7608)
    })
    it("POST /users/:userId/collections/:collid/stories/7628 Should not fetch story", async () => {
        const story = await Story.query().findById(8863)
        expect(story).toBe(undefined)
    })
    it("GET /users/:userId/collections/:collid/stories Should get stories from collection", async () => {
        const userId = await User.query().where("email", user1.email)
        const collId = await Collection.query().where("name", coll1.name)
        const res = await req.get(`/users/${userId[0].id}/collections/${collId[0].id}/stories`).send({
            token: token1
        })
        expect(res.body.length).toBe(2)
    })
    it("GET /users/:userId/collections/:collid/stories/1 Should get one story from collection", async () => {
        const userId = await User.query().where("email", user1.email)
        const collId = await Collection.query().where("name", coll1.name)
        const res = await req.get(`/users/${userId[0].id}/collections/${collId[0].id}/stories/1`).send({
            token: token1
        })
        expect(res.body.id).toBe(1)
    })
    describe("Test comments of story",async () => {
        it("GET /users/:userid/stories/:storyid/comments Should get comments of story",async () => {
            const userId = await User.query().where("email", user1.email)
            const collId = await Collection.query().where("name", coll1.name)
            const res = await req.get(`/users/${userId[0].id}/stories/7608/comments`).send({
                token: token1
            })
            expect(res.body.length).toBe(20)
        })
    })
})