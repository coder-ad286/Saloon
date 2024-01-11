import { generateToken } from "./jwt.js";

const sendToken = (res, tokenName, data) => {

    const token = generateToken({
        id: data._id,
        branchId: data.branchId
    });

    //setting cookies 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    //CLEAR OPPOSITE COOKIE
    if (tokenName === 'adminToken') {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
    }
    if (tokenName === 'token') {
        res.cookie('adminToken', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
    }
    
    return res.status(200)
        .cookie(tokenName, token, options)
        .json({
            success: true,
            token,
            data
        })
}

export default sendToken;