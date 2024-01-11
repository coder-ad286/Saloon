import Entries from "../models/entriesMdl.js";
import asyncError from "../utils/asyncError.js";
import { getToday } from "../utils/date.js";
import sendResponse from "../utils/sendResponse.js";

export const createEntry = asyncError(async (req, res, next) => {
    const { branchId } = req.data.branch
    const today = getToday();
    const newEntry = await Entries.create({
        ...req.body,
        ...today,
        branchId
    })
    sendResponse(res, 201, "Entry Created Successfully...!", newEntry)
})

export const fetchEntries = asyncError(async (req, res, next) => {
    const { branchId } = req.data.branch;
    const admin = req.data.admin;
    const date = req.body.date;
    const today = date ||  getToday();
    const entries = await Entries.find({ branchId ,...today});
    let totalAmount;
    if(admin){
        totalAmount = entries.reduce((prev,curr)=>prev+curr.amount , 0)
    }
    sendResponse(res, 200, "Entries Fetched Successfully...!", {entries,amount : admin ? totalAmount : undefined })
})