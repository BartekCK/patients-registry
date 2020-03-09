import * as mongoose from 'mongoose'

export const DiseaseSchema = mongoose.Schema({
    type: {
        type: String
    },
    kind: String
});
