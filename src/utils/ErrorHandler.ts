import { getErrorMessage } from '../config/responses'

export default class ErrorHandler {

    private code: number
    private message: string
    private details: string

    constructor(error = {}) {
        this.code = 500
        this.message = ''
        this.details = ''
        this.setError(error)
    }

    setError(error: any) {
        this.code = error.code || 500
        this.details = error.details || getErrorMessage(error.status)
        this.message = error.message || error.description
    }
    format() {
        return {
            code: this.code,
            message: this.message,
            details: this.details,
        }
    }
}
