import { Model } from "objection";
import Story from "./Story";
import User from "./User";

export default class Collection extends Model {
    id!: number
    name!: string
    ownerId!: number

    static get tableName() {
        return 'collections'
    }

    static get relationMappings() {
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,

                join: {
                    from: 'collections.ownerId',
                    to: 'users.id',
                },
            },
            stories: {
                relation: Model.ManyToManyRelation,
                modelClass: Story,

                join: {
                    from: 'collections.id',

                    through: {
                        from: 'stories-collects.collectionId',
                        to: 'stories-collects.storyId'
                    },
                    to: 'stories.id'
                }
            }
        }

    }
}