export type Failure<E extends Error = Error> = {
    _tag: "Failure";
    error: E;
};

export type Success<T = void> = {
    _tag: "Success";
    data: T;
};

export type Result<T = void, E extends Error = Error> = Failure<E> | Success<T>;

export function succeed<T = void>(data: T): Success<T> {
    return {
        _tag: "Success",
        data: data,
    };
}

export function fail<E extends Error = Error>(error: E): Failure<E> {
    return {
        _tag: "Failure",
        error: error,
    };
}
