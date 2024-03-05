import { instance } from "./instance";

export default function getProjectByProjectId(userId: string, projectId: string) {
    return instance
    .get(`/api/project/${userId}/${projectId}`)
    .then(({data: {project}}) => {
        return project
    })
}