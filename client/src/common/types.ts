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
    columns: ColumnDetails[]
};

export type ColumnDetails = {
    columnName: string,
    _id: string,
    cards: CardDetails[]
};

export type CardDetails = {
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