import supertest from "supertest"
import User from "../src/models/User"
import { server } from "../src/server"
import { deleteOneUser } from "../src/services/deleteService"
import { findUserByEmail } from "../src/services/findService"

const req = supertest(server)

describe('Test User Logic', async () => {

    const user1 = {
        email: "test1@gmail.com",
        password: "123456789"
    } as User

    const user2 = {
        email: "test2@gmail.com",
        password: "123456789"
    } as User

    let token1 = ""
    let token2 = ""
    describe("Test basic REST methods of user", async () => {
        beforeEach(async () => {
            const res1 = await req.post("/register").send({
                email: user1.email,
                password: user1.password
            })
            token1 = res1.body.token
            const res2 = await req.post("/register").send({
                email: user2.email,
                password: user2.password
            })
            token2 = res2.body.token
        })
        afterEach(async () => {
            await deleteOneUser(user1.email)
            await deleteOneUser(user2.email)
            await deleteOneUser("put@gmail.com")
        })
        afterAll(async () => {
            server.close()
        })
        it("GET /users should return all user", async () => {
            const res = await req.get("/users").send({
                token: token1
            })
            expect(res.statusCode).toBe(200)
            expect(res.body.length).toBe(2)

        })
        it("GET /users/:userid should return one user", async () => {
            const userId = await User.query().where('email', user1.email)
            const res = await req.get(`/users/${userId[0].id}`).send({
                token: token1
            })
            expect(res.statusCode).toBe(200)
            expect(res.body.email).toBe(user1.email)
        })
        it("GET /users/:userid should not return user", async () => {
            const res = await req.get(`/users/123456789`).send({
                token: token1
            })
            expect(res.statusCode).toBe(404)
        })
        it("PUT /users/:userid should by update user", async () => {
            const userId = await User.query().where('email', user1.email)
            const res = await req.put(`/users/${userId[0].id}`).send({
                email: "put@gmail.com",
                password: "1234567424",
                token: token1
            })
            const updateUser = await User.query().findById(userId[0].id)
            const oldUser = await findUserByEmail(user1.email)
            expect(res.status).toBe(200)
            expect(updateUser?.email).toBe("put@gmail.com")
            expect(oldUser).toBe(undefined)
        })
        it("PATCH /users/:userid should by update user", async () => {
            const userId = await User.query().where('email', user1.email)
            const res = await req.patch(`/users/${userId[0].id}`).send({
                email: "put@gmail.com",
                token: token1
            })
            const updateUser = await User.query().findById(userId[0].id)
            const oldUser = await findUserByEmail(user1.email)
            expect(res.status).toBe(200)
            expect(updateUser?.email).toBe("put@gmail.com")
            expect(oldUser).toBe(undefined)
        })
        it("DELETE /users/:userid should be able to delete user", async () => {
            const userId = await User.query().where('email', user1.email)
            const res = await req.delete(`/users/${userId[0].id}`).send({
                token: token1
            })
            expect(res.status).toBe(200)
            const deletedUser = await User.query().findById(userId[0].id)
            expect(deletedUser?.email).toBe(undefined)
        })
        it("DELETE /users/:userid should no be able to delete user", async () => {
            const userId = await User.query().where('email', user1.email)
            const res = await req.delete(`/users/${userId[0].id}`).send({
                token: token2
            })
            expect(res.status).toBe(401)
        })
    })
})