import { instance } from "./instance";

export function getProjectByProjectId(userId: string, projectId: string) {
    return instance
    .get(`/api/project/${userId}/${projectId}`)
    .then(({data: {projectDetails}}) => {
        return projectDetails
    })
}

export function postColumnInProject(userId: string, projectId: string, columnName: string) {
    const body = {
        userId,
        projectId,
        columnName
    };

    return instance
    .post("/api/project/column", body)
    .then(({data: {updatedDocument}}) => {
        return updatedDocument;
    })

}