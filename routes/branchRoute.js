import express from "express";
import { createBranch, loginBranch, logoutBranch } from "../controllers/branchCtrl.js";
const  branchRoute = express.Router()

branchRoute.post('/create',createBranch)
branchRoute.post('/login',loginBranch)
branchRoute.put('/logout',logoutBranch)

export default branchRoute;