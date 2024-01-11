import { model, Schema } from "mongoose";

const entriesSchema = new Schema({
    branchId: {
        type: String,
        required: [true, "BranchId Is Required...!"]
    },
    title: {
        type: String,
        required: [true, "Title Is Required...!"]
    },
    amount: {
        type: Number,
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

const Entries = model('Entries', entriesSchema);
export default Entries;