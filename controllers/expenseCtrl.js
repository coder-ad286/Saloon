import Expense from "../models/expenseMdl.js";
import asyncError from "../utils/asyncError.js";
import { getToday } from "../utils/date.js";
import sendResponse from "../utils/sendResponse.js";

export const createExpense = asyncError(async (req, res, next) => {
    const { branchId } = req.data.branch
    const today = getToday();
    const newExpense = await Expense.create({
        ...req.body,
        ...today,
        branchId
    })
    sendResponse(res, 201, "Expense Created Successfully...!", newExpense)
})

export const fetchExpenses = asyncError(async (req, res, next) => {
    const { branchId } = req.data.branch;
    const admin = req.data.admin;
    const date = req.body.date;
    const today = date ||  getToday();
    const expenses = await Expense.find({ branchId ,...today});
    let totalAmount;
    if(admin){
        totalAmount = expenses.reduce((prev,curr)=>prev+curr.amount , 0)
    }
    sendResponse(res, 200, "Entries Fetched Successfully...!", {expenses,amount : admin ? totalAmount : undefined })
})