import { Schema, model, models } from 'mongoose'

const TheatorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
    },
    lat: {
        type: String,
        required: true,
        trim: true
    },
    lng: {
        type: String,
        required: true,
        trim: true
    },
    images: [{ type: String }]
}, { timestamps: true })
const theatorModal = models.Theator || model('Theator', TheatorSchema);
export default theatorModal;