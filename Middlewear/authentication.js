var jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

const express = require("express");

const Auth = ((req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        status: "failed",
                        message: "not a valid token"
                    })
                }
                req.user = decoded.user_id;
                next()
            })
        }
    } else {
        return res.status(403).json({
            status: "failed",
            message: "unauthorized"
        })
    }
}
)


module.exports = Auth;
