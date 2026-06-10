import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    type: {
        type: String,
        enum: ['income','expense'],
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
},{timestamps: true})

export const Transaction = mongoose.model('Transaction',transactionSchema)