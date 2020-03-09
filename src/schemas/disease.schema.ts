import * as mongoose from 'mongoose'

export const DiseaseSchema = mongoose.Schema({
    type: {
        type: String
    },
    kind: String,
    helpMe: {
        type: Boolean,
        default: false
    },
    xCoordinate: {
        type: Number
    },
    yCoordinate: {
        type: Number
    }
});
