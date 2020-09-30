import { NextFunction, Request, Response } from 'express'


export default async (_: Request, __: Response, next: NextFunction) => {
    next()
}