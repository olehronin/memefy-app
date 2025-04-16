export type ServerResponse<T> = {
    code: number;
    data: T;
    message: string;
    status: string;
    path: string;
    time: string;
};

export type ServerResponseError = {
    code: number;
    message: string;
    status: string;
    path: string;
    time: string;
};
