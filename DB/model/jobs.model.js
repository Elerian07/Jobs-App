import { Schema, model, Types } from "mongoose";


const jobSchema = new Schema({

    company: {
        type: String,
        required: [true, 'Please provide company name'],
        max: 50,
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        max: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending', 'Accepted'],
        default: 'pending',
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: true,
    },
}, {
    timestamps: true
})


const jobModel = model('Job', jobSchema)
export default jobModel