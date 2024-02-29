import { instance } from "./instance";

export function getUsers() {
    return instance.get(`/api/users`)
    .then(({data : {users}}) => {
        return users
    });
}

export function getUser(username: string, password: string) {
    return instance.get(`/api/user/${username}/${password}`)
    .then(({data: {user}}) => {
        return user
    })
    .catch(() => {
        return Promise.reject("Incorrect username or password.")
    })
}