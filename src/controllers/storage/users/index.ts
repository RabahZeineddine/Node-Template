import StorageController from '..'

import { User } from '../../../models/storage'

export default class UsersStorageController extends StorageController {


    async findByEmail(email: string, select = ''): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (email) {
                    let user = await User.findOne({ 'email': email }).select(select)
                    resolve(user)
                } else {
                    throw { code: 400 }
                }
            } catch (error) {
                console.error(error)
                reject({ code: error.code || 500 })
            }
        })
    }

    async create(user: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (user) {
                    let userSchema = new User(user.toDatabase())
                    let newUser = await userSchema.save()
                    resolve(newUser)
                } else {
                    throw { code: 400 }
                }
            } catch (error) {
                reject({ code: error.code || 500 })
            }
        })
    }

    async findAll(select = '-_id -__v') {
        return new Promise(async (resolve, reject) => {
            try {
                let users = await User.find({}).select(select)
                resolve(users)
            } catch (error) {
                console.error(error)
                reject({ code: error.code || 500 })
            }
        })
    }

    async findOneAndUpdate(user: any, select = '') {
        return new Promise(async (resolve, reject) => {
            try {
                user.modifiedDate = new Date()
                user = await User.findOneAndUpdate({ '_id': user._id }, user).select(select)
                if (user) {
                    resolve(user)
                } else {
                    throw { code: 500 }
                }
            } catch (error) {
                console.error(error)
                reject({ code: error.code || 500 })
            }
        })
    }
}
