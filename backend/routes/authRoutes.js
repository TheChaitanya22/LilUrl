const { Router } = require("express");
const router = Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET }  = require("../config");
const { User } = require("../db");


const userBody = z.object({   
    email: z.string().email(),
    password: z.string().min(3).max(20),
})

router.post("/signup", async function (req, res) {
    const parsedUserData = userBody.safeParse(req.body);

    if(!parsedUserData.success){
        return res.json({
            message: "Incorrect Format",
            error: parsedUserData.error
        })
    } 

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        email: req.body.email,
        password: req.body.password
    })

    const userId = user._id;

    const token = jwt.sign(
        {userId}, 
        JWT_SECRET,
    );
    

    res.json({
        message:"User successfully createad",
        token: token
    })
});


router.post("/signin", async function (req, res) {

    const parsedUserData = userBody.safeParse(req.body);

    if(!parsedUserData.success){
        return res.json({
            message: "Incorrect Format",
            error: parsedUserData.error
        })
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const userId = user._id;

    const token = jwt.sign(
        {userId}, 
        JWT_SECRET,
    );
    

    return res.status(200).json({
        message: "Signin Successful",
        token: token
    });

});


module.exports = ({
    authRouter: router
})