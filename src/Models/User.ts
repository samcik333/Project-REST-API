import { Model } from "objection";
import Collection from "./Collection";

export default class User extends Model {
    id!: number
    email!: string
    password!: string
    token!: string
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        return {
            collects: {
                relation: Model.HasManyRelation,
                modelClass: Collection,
                join: {
                    from: 'users.id',
                    to: 'collections.ownerId'
                }
            }
        }
    }
}