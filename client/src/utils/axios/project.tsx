import { TProject } from "../../common/types";
import { instance } from "./instance";

export function getProjectByProjectId(userId: string, projectId: string) {
    return instance
        .get(`/api/project/${userId}/${projectId}`)
        .then(({ data: { project } }) => {
            return project;
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
        .then(({ data: { updatedProject } }) => {
            return updatedProject;
        })

}

export function postCardInColumn(userId: string, projectId: string, columnId: string, cardName: string) {
    const body = {
        userId,
        projectId,
        columnId,
        cardName
    };

    return instance
        .post("/api/project/column/card", body)
        .then(({ data: { updatedProject } }) => {
            return updatedProject;
        })
}

export async function deleteCard(userId: string, projectId: string, columnId: string, cardId: string) {
    const config = {
        data: {
            userId,
            projectId,
            columnId,
            cardId
        }
    };

    try {
        const updatedProject:TProject = await instance
        .delete("/api/project/column/card", config);

        return updatedProject;
    } catch(err) {
        console.log(err)
        return null;
    }
}