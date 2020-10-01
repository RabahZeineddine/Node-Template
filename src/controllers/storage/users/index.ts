import StorageController from '..'

import { User } from '../../../models/storage'

export default class UsersStorageController extends StorageController {


    async findByEmail(email: string, select = '', usedSession?: any): Promise<any> {
        try {
            if (email) {
                let user = this.run(usedSession, async (session) => await User.findOne({ 'email': email }).select(select).session(session).exec())
                return user
            } else {
                throw { code: 400 }
            }
        } catch (error) {
            console.error(error)
            throw { code: error.code }
        }
    }

    async create(user: any, usedSession?: any): Promise<any> {
        try {
            if (user) {
                let userSchema = new User(user.toDatabase())
                let newUser = this.run(usedSession, async (session) => await userSchema.save({ session }))
                return newUser
            } else {
                throw { code: 400 }
            }
        } catch (error) {
            throw { code: error.code }
        }

    }

    async findAll(select = '-_id -__v', usedSession?: any) {
        try {
            let users = this.run(usedSession, async (session) => await User.find({}).select(select).session(session).exec())
            return users
        } catch (error) {
            console.error(error)
            throw { code: error.code }
        }

    }

    async findOneAndUpdate(user: any, select = '', usedSession?: any) {
        try {
            user.modifiedDate = new Date()
            user = this.run(usedSession, async (session) => await User.findOneAndUpdate({ '_id': user._id }, user).select(select).session(session).exec())
            if (user) {
                return user
            } else {
                throw { code: 500 }
            }
        } catch (error) {
            console.error(error)
            throw { code: error.code }
        }
    }
}
