import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        unique: true
    },
    health: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthCard'
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiseaseCard'
    },
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
