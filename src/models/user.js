
export default class User {


    /**
     *
     * @param {String} _id
     * @param {String} email
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} password
     */
    constructor(_id = '', firstName = '', lastName = '', email = '', password = '') {
        this._id = _id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }

    /**
     *
     * @param {String} _id
     */
    setId(_id) {
        this._id = _id
    }

    /**
     *
     * @param {String} email
     */
    setEmail(email) {
        this.email = email
    }

    setDataFromDB(userDB) {
        if (userDB) {
            if (userDB._id) this._id = userDB._id
            if (userDB.firstName) this.firstName = userDB.firstName
            if (userDB.lastName) this.lastName = userDB.lastName
            if (userDB.email) this.email = userDB.email
            if (userDB.password) this.password = userDB.password
        }
    }

    toDatabase() {
        let object = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        }
        if (this._id) object['_id'] = this._id
        return object
    }

    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        }
    }
}
