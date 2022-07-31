import Koa from "koa";
import KoaRouter from "koa-router";
import BodyParser from "koa-bodyparser";
import { Model } from "objection";
import Knex from "knex";
import knexConfiig from '../knexfile';
import registerApi from "./routes/index"

const knex = Knex(knexConfiig.development);

Model.knex(knex);

const PORT = 3000;
const app = new Koa();
const router = new KoaRouter();

app
    .use(BodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

const server = app.listen(PORT, () => console.log(`Server running at ${PORT}`))

registerApi(router)

export { server }





