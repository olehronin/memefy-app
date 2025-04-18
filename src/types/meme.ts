export enum SortBy {
    ID = "id",
    NAME = "name",
    LIKES = "likes",
}

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
}

export interface Meme {
    id: number;
    name: string;
    imageUrl: string;
    likes: number;
}
