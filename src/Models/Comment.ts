import { Model } from "objection";
import Story from "./Story";

export default class Comment extends Model {
    id! : number
    time!: number 
    static get tableName() {
        return 'comments'
    }

    static get relationMappings() {
        return {
            story: {
                relation: Model.BelongsToOneRelation,

                modelClass: Story,

                join: {
                    from: 'comments.storyId',
                    to: 'stories.id',
                },
            },
            children: {
              relation: Model.HasManyRelation,
              modelClass: Comment,
              join: {
                  from: 'comments.id',
                  to: 'comments.parentId'
              }
          },
            parent: {
              relation: Model.BelongsToOneRelation,
              modelClass: Comment,
              join: {
                from: 'comments.parentId',
                to: 'comments.id',
              },
            }
        }
    }
}