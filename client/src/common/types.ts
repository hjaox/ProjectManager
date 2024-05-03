export type TProfileState = {
    userDetails: {
        _id: string,
        name: string,
        username: string,
        email: string,
        accessToken: string
    },
    isLoggedIn: boolean
};

export type TProject = {
    projectName: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
    columns: TProjectColumn[]
};

export type TProjectColumn = {
    columnName: string,
    _id: string,
    cards: TProjectCards[]
};

export type TProjectCards = {
    cardName: string,
};

export type TProjects = {
    projects: TProject[],
    setProjects: React.Dispatch<React.SetStateAction<TProject[]>>
}

export type TProfileOverview = {
    projects: TProject[],
    project: TProject,
}

export type TColumns = {
    columns: TProjectColumn[],
    userId: string,
    setProject: React.Dispatch<React.SetStateAction<TProject | null>>,
    project: TProject
}