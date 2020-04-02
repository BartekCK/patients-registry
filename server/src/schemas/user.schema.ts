import * as mongoose from 'mongoose';

const HealthInformation = new mongoose.Schema({

    emergencyNumber: {
        type: String,
    },
    howHelp: {
        type: String,
        maxLength: 256,
    },
    notDo: {
        type: String,
        maxLength: 256,
    },
}, {_id: false});


const CoordinateInformation = new mongoose.Schema({

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
    disease: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'diseases'
    }],
    coordinateInformation: CoordinateInformation,

    healthInformation: HealthInformation
});
