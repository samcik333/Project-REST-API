import { Request } from "node-fetch";
import supertest from "supertest";
import User from "../src/Models/User";
import { server } from "../src/server";
import { deleteOneUser } from "../src/services/deleteService";

const req = supertest(server)

describe('Test Authentication Logic', async () => {

    const user = {
        email: "test@gmail.com",
        password: "123456789"
    } as User

    beforeAll(async () => {
        await req.post('/register')
            .send({
                email: user.email,
                password: user.password
            })
    })
    afterAll(async () => {
        await deleteOneUser(user.email)
        server.close()
    })

    describe('Test Authenticante methods', () => {
        it('Should not be able to create user because already exist', async () => {
            const res = await req
                .post('/register')
                .send({
                    email: user.email,
                    password: user.password
                })
            expect(res.statusCode).toBe(409)
        })
        it('Should be able to login', async () => {
            const res = await req
                .post('/login')
                .send({
                    email: user.email,
                    password: user.password
                })
            expect(res.statusCode).toBe(200)
        })
        it('Should be not able to login because user dont exist', async () => {
            const res = await req
                .post('/login')
                .send({
                    email: "test1@gmail.com",
                    password: user.password
                })

            expect(res.statusCode).toBe(404)
        })
        it('Should be not able to login because wrong password', async () => {
            const res = await req
                .post('/login')
                .send({
                    email: user.email,
                    password: "123456789123456"
                })

            expect(res.statusCode).toBe(400)
        })

    })
})