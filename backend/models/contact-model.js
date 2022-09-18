import mongoose from 'mongoose';
var Schema = mongoose.Schema
let contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('contactModel', contactSchema)
