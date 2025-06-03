class HttpError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string) {
        super(message, 409);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = "Internal Server Error") {
        super(message, 500);
    }
}

export { HttpError };
