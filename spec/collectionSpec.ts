import supertest from "supertest";
import Collection from "../src/Models/Collection";
import User from "../src/Models/User";
import { server } from "../src/server";
import { deleteOneUser } from "../src/services/deleteService";

const req = supertest(server)

describe("Test Collection Logic", async () => {
    const user1 = {
        email: "test1@gmail.com",
        password: "123456789"
    } as User
    const user2 = {
        email: "test2@gmail.com",
        password: "123456789"
    } as User
    const coll1 = {
        name: "Collection1"
    } as Collection
    const coll2 = {
        name: "Collection2"
    } as Collection

    let token1 = ""
    let token2 = ""
    beforeAll(async () => {
        const res1 = await req.post("/register").send({
            email: user1.email,
            password: user1.password
        })
        const res2 = await req.post("/register").send({
            email: user2.email,
            password: user2.password
        })
        token1 = res1.body.token
        token2 = res2.body.token
    })
    beforeEach(async () => {
        const userId1 = await User.query().where('email', user1.email)
        const userId2 = await User.query().where('email', user2.email)
        await req.post(`/users/${userId1[0].id}/collections`).send({
            name: coll1.name,
            token: token1
        })
        await req.post(`/users/${userId2[0].id}/collections`).send({
            name: coll2.name,
            token: token2
        })
    })
    afterEach(async () => {
        await Collection.query().where("name", coll1.name).delete()
        await Collection.query().where("name", coll2.name).delete()
        await Collection.query().where("name", "coll1").delete()
    })
    afterAll(async () => {
        await deleteOneUser(user1.email)
        await deleteOneUser(user2.email)
        server.close()
    })

    describe("Test Collection REST methods ", async () => {
        it("Check if collections was created collections", async () => {
            const colls = await Collection.query()
            expect(colls.length).toBe(2)
        })
        it("GET /users/:userid/collections should get all collections", async () => {
            const userId = await User.query().where("email", user1.email)
            const res = await req.get(`/users/${userId[0].id}/collections`).send({
                token: token1
            })
            expect(res.body.length).toBe(2)
        })
        it("GET /users/:userid/collections/:collid should get one collection", async () => {
            const userId = await User.query().where("email", user1.email)
            const collId = await Collection.query().where("name", coll1.name)
            const res = await req.get(`/users/${userId[0].id}/collections/${collId[0].id}`).send({
                token: token1
            })
            expect(res.body.name).toBe(coll1.name)
            expect(res.statusCode).toBe(200)
        })
        it("GET /users/:userid/collections/:collid should not get collection", async () => {
            const userId = await User.query().where("email", user1.email)
            const collId = await Collection.query().where("name", coll1.name)
            const res = await req.get(`/users/${userId[0].id}/collections/1234567897`).send({
                token: token1
            })
            expect(res.statusCode).toBe(404)
        })
        it("PUT /users/:userid/collections/:collid should update collection", async () => {
            const userId = await User.query().where("email", user1.email)
            const collId = await Collection.query().where("name", coll1.name)
            await req.put(`/users/${userId[0].id}/collections/${collId[0].id}`).send({
                name: "coll1",
                token: token1
            })
            const name = collId[0].name
            const updatedCollection = await Collection.query().findById(collId[0].id)
            const oldCollection = await Collection.query().findOne({ name })
            expect(updatedCollection?.name).toBe("coll1")
            expect(oldCollection).toBe(undefined)
        })
        it("PATCH /users/:userid/collections/:collid should update collection", async () => {
            const userId = await User.query().where("email", user1.email)
            const collId = await Collection.query().where("name", coll1.name)
            await req.patch(`/users/${userId[0].id}/collections/${collId[0].id}`).send({
                name: "coll1",
                token: token1
            })
            const name = collId[0].name
            const updatedCollection = await Collection.query().findById(collId[0].id)
            const oldCollection = await Collection.query().findOne({ name })
            expect(updatedCollection?.name).toBe("coll1")
            expect(oldCollection).toBe(undefined)
        })
        it("DELETE /users/:userid/collections/:collid should delete collection", async () => {
            const userId = await User.query().where("email", user1.email)
            const collId = await Collection.query().where("name", coll1.name)
            const res = await req.delete(`/users/${userId[0].id}/collections/${collId[0].id}`).send({
                token: token1
            })

            expect(res.statusCode).toBe(200)
            const oldCollection = await Collection.query().findById(collId[0].id)
            expect(oldCollection).toBe(undefined)
        })
        it("DELETE /users/:userid/collections/:collid should not delete collection", async () => {
            const userId = await User.query().where("email", user1.email)
            const collId = await Collection.query().where("name", coll2.name)
            const res = await req.delete(`/users/${userId[0].id}/collections/${collId[0].id}`).send({
                token: token1
            })
            expect(res.statusCode).toBe(401)
        })
    })
})
