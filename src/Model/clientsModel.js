import mongoose from '../database/index.js';

const { Schema, model } = mongoose;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    favoriteProducts: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Client = model('Client', ClientSchema);

export default Client;