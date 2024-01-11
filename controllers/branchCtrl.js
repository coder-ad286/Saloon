import Branch from "../models/branchMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import sendResponse from "../utils/sendResponse.js";
import sendToken from "../utils/sendToken.js";
import { checkEmpty } from "../utils/validate.js";

export const createBranch = asyncError(async (req, res, next) => {
    const hashedPasscode = await hashPassword(req.body.passcode);
    const hashedAdminPasscode = await hashPassword(req.body.adminPasscode);
    const newBranch = await Branch.create({
        ...req.body,
        passcode: hashedPasscode,
        adminPasscode: hashedAdminPasscode
    });
    sendResponse(res, 201, "Branch Created Successfully...!", newBranch)
})

export const loginBranch = asyncError(async (req, res, next) => {
    const { branchId, passcode } = req.body;
    if (checkEmpty([branchId, passcode])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    const branch = await Branch.findOne({ branchId })
    if (!branch) return next(new ErrorHandler("Invalid Credentials...!"))
    if (await comparePassword(passcode, branch.passcode)) {
        return sendToken(res, 'token', branch)
    }
    if (await comparePassword(passcode, branch.adminPasscode)) {
        return sendToken(res, 'adminToken', branch)
    }
    return next(new ErrorHandler("Invalid Credentials...!"))
})

export const logoutBranch = asyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.cookie('adminToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    sendResponse(res, 200, "Branch Logged Out Successfully...!")
})