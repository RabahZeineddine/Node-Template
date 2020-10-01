import { Request, Response } from 'express'

export default (err: any, _: Request, res: Response) => {
    // we had a joi error, let's return a custom 400 json response
    return res.status(400).json({
        type: err.type, // it could be 'headers', 'body', 'query' or 'params'
        message: err.error.toString()
    })
}

