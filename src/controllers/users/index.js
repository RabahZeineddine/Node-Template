import UsersStorageController from '../storage/users'
import { getErrorMessage } from '../../config/responses'
import User from '../../models/user'


export default class UsersController {

    constructor() {
        this.storageController = new UsersStorageController()
    }


    async create(user) {
        return new Promise(async (resolve, reject) => {
            try {

                let userDB = await this.storageController.findByEmail(user.email)
                if (userDB) {
                    reject({ code: 409, message: getErrorMessage(409) })
                } else {
                    userDB = await this.storageController.create(user)
                    user.setDataFromDB(userDB)
                    resolve(user)
                }

            } catch (error) {
                console.error(error)
                reject({ code: error.code || 500, message: getErrorMessage(error.code || 500) })
            }

        })
    }

    async findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let users = await this.storageController.findAll('-_id email firstName lastName')
                resolve(users)
            } catch (error) {
                console.error(error)
                reject({ code: error.code || 500, message: getErrorMessage(error.code || 500) })
            }
        })
    }

    async findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await this.storageController.findByEmail(email, '-_id email firstName lastName')
                if (user) {
                    resolve(user)
                } else {
                    throw { code: 404 }
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    async updateByEmail(user) {
        return new Promise(async (resolve, reject) => {
            try {
                let userDB = await this.storageController.findByEmail(user.email)
                let userDB_aux = new User()
                userDB_aux.setDataFromDB(userDB)
                if (userDB) {
                    userDB_aux.firstName = user.firstName
                    userDB_aux.lastName = user.lastName
                    await this.storageController.findOneAndUpdate(userDB_aux.toDatabase(), '-_id email firstName lastName')
                    resolve(userDB_aux)
                } else {
                    throw { code: 404 }
                }

            } catch (error) {
                console.error(error)
                reject({ code: error.code || 500, message: getErrorMessage(error.code || 500) })
            }
        })
    }
}
