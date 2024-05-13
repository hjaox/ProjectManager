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
    cards: TProjectCard[]
};

export type TProjectCard = {
    cardName: string,
    _id: string,
    details: string
};

export type TProjects = {
    projects: TProject[],
    setProjects: React.Dispatch<React.SetStateAction<TProject[]>>
}

export type TProfileOverview = {
    projects: TProject[],
    project: TProject,
    setExpandOverview: React.Dispatch<React.SetStateAction<boolean>>,
    expandOverview: boolean
}

export type TColumns = {
    columns: TProjectColumn[],
    userId: string,
    setProject: React.Dispatch<React.SetStateAction<TProject | null>>,
    project: TProject,
    setDisplayCard: React.Dispatch<React.SetStateAction<{
        card: TProjectCard;
        userId: string;
        projectId: string;
        columnId: string;
    } | null>>
}

export type TCards = {
    userId: string,
    projectId: string,
    setProject: React.Dispatch<React.SetStateAction<TProject | null>>,
    cards: TProjectCard[],
    columnId: string,
    setShowCardOptions: React.Dispatch<React.SetStateAction<{
        [key: string]: boolean;
    }>>,
    setCardToEdit: React.Dispatch<React.SetStateAction<TProjectCard>>,
    setDisplayCard: React.Dispatch<React.SetStateAction<{
        card: TProjectCard;
        userId: string;
        projectId: string;
        columnId: string;
    } | null>>
}

export type TEditCard = {
    columnId: string,
    cardToEdit: TProjectCard,
    projectId: string,
    setProject: React.Dispatch<React.SetStateAction<TProject | null>>,
    setShowCardOptions: React.Dispatch<React.SetStateAction<{
        [key: string]: boolean;
    }>>,
    setShowDeleteCardPrompt: React.Dispatch<React.SetStateAction<boolean>>,
    showDeleteCardPrompt: boolean
}

export type TDisplayCard = {
    displayCard: {
        card: TProjectCard;
        userId: string;
        projectId: string;
        columnId: string;
    },
    setDisplayCard: React.Dispatch<React.SetStateAction<{
        card: TProjectCard;
        userId: string;
        projectId: string;
        columnId: string;
    } | null>>,
    setProject: React.Dispatch<React.SetStateAction<TProject | null>>
}

export type TEditColumn = {
    userId: string,
    projectId: string,
    columnId: string,
    columnName: string,
    setProject: React.Dispatch<React.SetStateAction<TProject | null>>,
}