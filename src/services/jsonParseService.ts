import User from "../models/User";

export default async function showUserWithToken(user: User) {
    return JSON.parse(`{"id": ${user.id},"email": "${user.email}","token":"${user.token}"}`)
}

