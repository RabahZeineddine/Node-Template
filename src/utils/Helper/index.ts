import has from 'has-values'
import moment, { Moment } from 'moment'
import Logger from '../Logger'

export class Helper {



    static isEmpty(data: any) {
        if (typeof (data) == 'undefined' || data === null) return true
        if (typeof data == 'string') return !has(data.trim())
        return !has(data)
    }
    static parseMongoError(error: any): any {
        if (error.code) {
            if (error.code == 11000) error.code = 409
        }
        return error
    }

    static getFormattedDate(date?: Date, utc = false, format = 'DD/MM/YYYY'): string {
        if (!date) return ''
        let momentDate: Moment
        try {
            if (utc) momentDate = moment(date).utc()
            else momentDate = moment(date)
            return momentDate.format(format)
        } catch (error) {
            Logger.error(error)
            return ''
        }
    }
}