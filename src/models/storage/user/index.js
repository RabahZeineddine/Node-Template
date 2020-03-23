import mongoose from 'mongoose'
import { DATABASE_MODELS } from '../../../config/storage'


const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


export default mongoose.model(DATABASE_MODELS.USER, userSchema)
