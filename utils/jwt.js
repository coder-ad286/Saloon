import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    const { ACCESS_TOKEN_SECRET } = process.env;
    console.log(ACCESS_TOKEN_SECRET);
    const token = jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET
    )
    return token;
}