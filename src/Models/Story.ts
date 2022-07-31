import { Model } from "objection";
import Collection from "./Collection";
import Comment from "./Comment";

export default class Story extends Model {
    id! :number
    title! :string
    time! :number
    author! :string
    static get tableName() {
        return 'stories'
    }

    static get relationMappings() {
        return {
            collections: {
                relation: Model.ManyToManyRelation,
                modelClass: Collection,

                join: {
                    from: 'stories.id',

                    through: {
                        from: 'stories-collects.storyId',
                        to: 'stories-collects.collectionId',
                    },

                    to: 'collections.id',

                },
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comment,

                join: {
                    from: 'stories.id',
                    to: 'comments.storyId',
                }
            }
        }
    }
}