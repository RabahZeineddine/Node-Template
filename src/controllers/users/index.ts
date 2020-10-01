import UsersStorageController from '../storage/users'
import User from '../../models/user'


export default class UsersController {

    private storageController

    constructor() {
        this.storageController = new UsersStorageController()
    }


    async create(user: any) {
        try {
            let userDB = await this.storageController.findByEmail(user.email)
            if (userDB) {
                throw { code: 409 }
            } else {
                userDB = await this.storageController.create(user)
                user.setDataFromDB(userDB)
                return user
            }

        } catch (error) {
            throw { code: error.code }
        }
    }

    async findAll() {
        try {
            let users = await this.storageController.findAll('-_id email firstName lastName')
            return users
        } catch (error) {
            throw { code: error.code }
        }
    }

    async findByEmail(email: string) {
        try {
            let user = await this.storageController.findByEmail(email, '-_id email firstName lastName')
            if (user) {
                return user
            } else {
                throw { code: 404 }
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateByEmail(user: any): Promise<any> {

        try {
            let userDB = await this.storageController.findByEmail(user.email)
            let userDB_aux: any = new User()
            userDB_aux.setDataFromDB(userDB)
            if (userDB) {
                userDB_aux.firstName = user.firstName
                userDB_aux.lastName = user.lastName
                await this.storageController.findOneAndUpdate(userDB_aux.toDatabase(), '-_id email firstName lastName')
                return userDB_aux
            } else {
                throw { code: 404 }
            }

        } catch (error) {
            console.error(error)
            throw { code: error.code }
        }

    }
}
