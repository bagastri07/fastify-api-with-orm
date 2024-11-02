interface ResponsePayload<T> {
    status: string;
    data?: T;
    error?: string;
}

export const generateResponse = <T>(
    status: 'success' | 'error',
    data?: T,
    error?: string,
): ResponsePayload<T> => {
    return {
        status,
        data,
        error,
    };
};
