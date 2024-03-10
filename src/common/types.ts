export type ProfileState = {
    userDetails: {
        _id: string,
        name: string,
        username: string,
        email: string,
        accessToken: string
    },
    isLoggedIn: boolean
};

export type ProjectDetails = {
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