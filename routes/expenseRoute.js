import express from "express";
import { createExpense, fetchExpenses } from "../controllers/expenseCtrl.js";
const  expenseRoute = express.Router()
import { isAuthenticated } from "../middlewares/authenticate.js";


expenseRoute.post('/create',isAuthenticated,createExpense)
expenseRoute.get('/fetch-expenses',isAuthenticated,fetchExpenses)

export default expenseRoute;