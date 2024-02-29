import { instance } from "./instance";

export function getProjectsByUserID(userID: string | undefined) {
    return instance.get(`/api/projects/${userID}`)
    .then(({data: {projects}}) => {
        return projects
    })
}