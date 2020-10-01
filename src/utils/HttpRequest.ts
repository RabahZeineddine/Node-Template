import axios from 'axios'
import ErrorHandler from './ErrorHandler'
import { MEDIA_TYPES } from '../config/HttpRequest'
import qs from 'qs'
import { logger } from './Logger'


axios.interceptors.request.use(function (config: any) {
    if (config.headers && config.headers['content-type'] == MEDIA_TYPES.APPLICATION_FORM) {
        config.data = qs.stringify(config.data)
    }

    config.meta = config.meta || {}
    config.meta.requestStartedAt = new Date().getTime()
    logger.info(`External Request: ${config.method} ${config.url}`)
    logger.info(`Body: ${JSON.stringify(config.data, null, 2)}`)
    return config
})

axios.interceptors.response.use((options: any) => {
    logger.info(`Request: ${options.config.method.toUpperCase()} ${options.config.url} - ${options.config.status} - ${new Date().getTime() - options.config.meta.requestStartedAt} ms`)
    return options
}, (error) => {
    logger.error(`Request: ${error.config.method.toUpperCase()} ${error.config.url} - ${error.response.status} - ${new Date().getTime() - error.config.meta.requestStartedAt} ms`)
    return error
})


export default class HttpRequest {

    static async get(URL: string, options: any = {}) {
        try {
            const fullResponse = options.rawResponse ? true : false
            delete options.rawResponse
            let response: any = await axios.get(URL, options)
            if (response.isAxiosError) throw { error: response }
            if (fullResponse) return response
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                code: error.response?.status,
                ...error.response?.data,
            })
            throw errorHandler.format()
        }
    }

    static async post(URL: string, body: any = {}, options: any = {}) {
        try {
            let response: any = await axios.post(URL, body, options)
            if (response.isAxiosError) throw response
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                code: error.response?.status || 500,
                ...error.response?.data,
            })
            throw errorHandler.format()
        }
    }
    static async put(URL: string, body = {}, options = {}) {
        try {
            let response: any = await axios.put(URL, body, options)
            if (response.isAxiosError) throw response
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                code: error.response?.status || 500,
                ...error.response?.data,
            })
            throw errorHandler.format()
        }
    }

    static async patch(URL: string, body = {}, options = {}) {
        try {
            let response: any = await axios.patch(URL, body, options)
            if (response.isAxiosError) throw response
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                code: error.response?.status || 500,
                ...error.response?.data,
            })
            throw errorHandler.format()
        }
    }

    static async make(URL: string, METHOD: any, body: any = {}, options: any = {}) {
        try {
            let result: any = await axios({
                method: METHOD,
                url: URL,
                data: body,
                headers: options.headers
            })
            if (!result.isAxiosError)
                return result.data
            else throw result
        } catch (error) {
            let errorHandler = new ErrorHandler({
                code: error.response?.status || 500,
                ...error.response?.data,
            })
            throw errorHandler.format()
        }
    }
}
