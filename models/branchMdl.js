import { model, Schema } from "mongoose";

const branchSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title Is Required...!"]
    },
    branchId: {
        type: String,
        required: [true, "BranchId Is Required...!"]
    },
    passcode: {
        type: String,
        required: [true, "Passcode Is Required...!"]
    },
    adminPasscode: {
        type: String,
        required: [true, "Passcode Is Required...!"]
    },
    address: {
        type: String,
        required: [true, "Address Is Required...!"]
    },
},{timestamps:true});

const Branch = model('Branch', branchSchema);
export default Branch;