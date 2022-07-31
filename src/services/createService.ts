import User from "../Models/User";

export default async function createCollection(name: any, id: any) {
        const userId = parseInt(id);
        await User.relatedQuery('collects').for(userId).insert({
                name: name
        });
}