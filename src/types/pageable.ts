export interface PageableRequest {
    page: number;
    size: number;
    sort?: string;
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