export const ERRORS = {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    DEFAULT: 'An error ocurred, try again later',
    UNAUTHORIZED: 'Unauthorized',
    BAD_REQUEST: 'Bad request or missing parameters',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Resource not found',
    DATABASE_ERROR: {
        CREATE: 'An error ocurred when creating resource',
        UPDATE: 'An error ocurred when updating resource',
        DELETE: 'An error ocurred when deleting resource',
    }

}
export const ERRORS_CODE = {
    DEFAULT: {
        message: 'An error ocurred, try again later',
        code: 0
    },
    UNAUTHORIZED: {
        message: 'Unauthorized',
        code: 401
    },
    BAD_REQUEST: {
        message: 'Bad request or missing parameters',
        code: 400
    },
    FORBIDDEN: {
        message: 'Forbidden',
        code: 403
    },
    NOT_FOUND: {
        message: 'Resource not found',
        code: 404
    },
    CONFLICT: {
        message: 'Resource already exists | Conflict',
        code: 409
    },
    INTERNAL_SERVER_ERROR: {
        message: 'Internal server error',
        code: 500
    },
    SERVICE_UNAVAILABLE: {
        message: 'Service Unavailable',
        code: 503
    }
}
export const getErrorMessage = (code: number) => {
    if (!code || typeof code != 'number') return ERRORS.DEFAULT
    let error: any = {}
    error = Object.values(ERRORS_CODE).find((error) => {
        return error.code == code
    })

    if (!error) return ERRORS.DEFAULT

    try {
        return error.message
    } catch (err) {
        console.error(err)
        return ERRORS.DEFAULT
    }
}
