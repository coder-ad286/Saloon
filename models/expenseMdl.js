import { model, Schema } from "mongoose";

const expenseSchema = new Schema({
    branchId: {
        type: String,
        required: [true, "BranchId Is Required...!"]
    },
    title: {
        type: String,
        required: [true, "Title Is Required...!"]
    },
    amount: {
        type: String,
        required: [true, "Amount Is Required...!"]
    },
    date : {
        type : Number,
        required:[true,"Date is Required...!"]
    },
    month : {
        type : Number,
        required:[true,"Month is Required...!"]
    },
    year : {
        type : Number,
        required:[true,"Year is Required...!"]
    }
});

const Expense = model('Expense', expenseSchema);
export default Expense;