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
        const { data: { updatedProject } } = await instance
            .delete("/api/project/column/card", config);

        return updatedProject;
    } catch {
        return null;
    }
}

export async function patchCard(userId: string, projectId: string, columnId: string, cardId: string, ...properties: [{ [key: string]: string }]) {
    const body: {
        userId: string,
        projectId: string,
        columnId: string,
        cardId: string,
        details?: string,
        cardName?: string
    } = {
        userId,
        projectId,
        columnId,
        cardId,
    };

    properties.forEach(pair => {
        const [[key, value]] = Object.entries(pair);

        if (key === "details" || key === "cardName") {
            body[key] = value;
        }
    });

    try {
        const { data: { updatedProject } } = await instance
            .patch("/api/project/column/card", body);

        return updatedProject;
    } catch {
        return null;
    }
}

export async function deleteColumn(userId: string, projectId: string, columnId: string) {
    const config = {
        data: {
            userId,
            projectId,
            columnId
        }
    };

    try {
        const { data: { updatedProject } } = await instance
            .delete("/api/project/column", config);

        return updatedProject;
    } catch {
        return null;
    }
}

export async function patchColumn(userId: string, projectId: string, columnId: string, columnName: string) {
    const body = {
        userId,
        projectId,
        columnId,
        columnName
    };

    try {
        const { data: { updatedProject } } = await instance
            .patch("/api/project/column", body);

        return updatedProject;
    } catch {
        return null;
    }
}

export async function patchProject(userId: string, projectId: string, projectName: string) {
    const body = {
        userId,
        projectId,
        projectName
    };

    try {
        const { data: { updatedProject } } = await instance
            .patch("/api/project", body);

        return updatedProject;
    } catch {
        return null
    }
}