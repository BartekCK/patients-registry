import * as mongoose from 'mongoose'

export const HealthSchema = new mongoose.Schema({
    emergencyNumber: String,
    howHelp: {
        type: String,
        maxLength: 256
    },
    notDo: {
        type: String,
        maxLength: 256
    }
});
