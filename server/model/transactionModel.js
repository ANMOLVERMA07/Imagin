import {Schema,model,models} from "mongoose";

const transactionSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    plan:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    credits:{
        type:Number,
        required:true,
    },
    payment:{
        type:Boolean,
        default:false,
    },
    date: { type:Number },
})

const Transaction = models.Transaction || model("Transaction",transactionSchema);

export default Transaction;