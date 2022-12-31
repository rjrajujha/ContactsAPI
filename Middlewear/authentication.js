var jwt=require('jsonwebtoken');
const { JWT_SECRET } = require("../keys")
const express = require("express");

const Auth=(async (req, res, next) => {

    if(req.headers.authorization){
        const token=req.headers.authorization;
        // console.log(token)
        if(token){
            jwt.verify(token,JWT_SECRET,async(err,decoded)=>{
                if(err){
                    return res.status(403).json({
                        status:"failed",
                        message:"not a valid token"
                    })
                }
                // console.log(decoded);
                req.user=decoded.user_id;
                next()
            })
        }
    }else{
        return res.status(403).json({
            status:"failed",
            message:"unauthorized"
        })
    }}
)


module.exports=Auth;
