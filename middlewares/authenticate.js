import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import Branch from "../models/branchMdl.js";
import { validateId } from "../utils/validate.js";

export const isAuthenticated = asyncError(async (req, res, next) => {

    //GET TOKEN FROM "cookies"
    const { adminToken, token } = req.cookies;

    if ((!adminToken) && (!token)) {
        return next(new ErrorHandler('Login first to handle this resource...!', 401))
    }

    jwt.verify(
        adminToken || token,
        process.env.ACCESS_TOKEN_SECRET,
        async (error, decoded) => {
            if (error) {
                return next(new ErrorHandler('Login first , Invalid Token...!', 401))
            }
            if (decoded) {
                if (!validateId(decoded.id)) return next(new ErrorHandler('Login first , Invalid Token...!', 401))
                const branch = await Branch.findById(decoded.id)
                if (!branch) return next(new ErrorHandler('Login first , Invalid Token...!', 401))
                req.data = {
                    branch,
                    admin: adminToken ? true : false
                }
                next();
            }
        }
    );
})
