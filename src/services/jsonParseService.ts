import User from "../Models/User";

export default async function showUserWithToken(user: User) {
    return JSON.parse(`{"id": ${user.id},"email": "${user.email}","token":"${user.token}"}`)
}

