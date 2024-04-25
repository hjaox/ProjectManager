import { instance } from "./instance";

export function getProjectsByUserID(userID: string | undefined) {
    return instance.get(`/api/projects/${userID}`)
        .then(({ data: { projects } }) => {
            return projects
        })
}

export function removeProject(userId: string, projectId: string) {
    return instance
        .delete(`/api/projects/${userId}/${projectId}`)
        .then(({ data: { projects } }) => {
            return projects
        })
}

export function addProject(userId: string, projectName: string) {
    const body = {
        userId,
        projectName
    }

    return instance
    .post("/api/projects", body)
    .then(({data: {projects}}) => {
        return projects
    })
}