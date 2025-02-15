import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError
        }
        const decodedToken= await jwt.verify(token,precess.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            //discuss about fronted
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user=user;
        next();
    } catch (error) {
        throw new ApiError(401,error.message || "Invalid acess token")
    }
})