export enum SortBy {
    ID = "id",
    NAME = "name",
    LIKES = "likes",
}

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
}

export interface Sort {
    by: SortBy;
    order: SortOrder;
}

export interface PageableRequest {
    page: number;
    size: number;
    sorts?: Sort[];
    sort?: Sort;
}

export interface PageableResponse<T> {
    content: T[];
    page: Pageable;
}

export interface Pageable {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
