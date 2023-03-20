const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "Mynameisshivendraandihavemajorinterstincompetitiveprogramming";

//Whenever we hit url - /api/createuser it will create a user from the model
//which we have made for our user and send a success response.


//ROUTE FOR OUR SIGNUP 
router.post("/createuser",
    [
        //Validation part for the data feilds.

        //Cheaking for valid email
        body('email', 'Write correct Email').isEmail(),

        //Name must contains atleast 3 chars
        body('name', 'Name should contains atleast 3 chars').isLength({ min: 3 }),

        // password must be at least 5 chars long
        body('password', 'Password should contains atleast 5 chars').isLength({ min: 5 })
    ]
    ,
    async function (req, res) {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        

        //Generation of Salt
        const salt = await bcrypt.genSalt(10);
        //secPassword stores the hash of given password
        let secPassword = await bcrypt.hash(req.body.password , salt);


        //Cheaking if the entered email is currently in use or not!
        let email = req.body.email;
        let userData = await User.findOne({ email });
        if(userData) {
            return res.json({ success: false , emailinUse : true });
        }
        
        try {
            //Storing data into our DB with collection name user
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })

            return res.json({ success: true , emailinUse : false  });
            // res.send("Hello!");
        }
        catch {
            console.log(error);
            return res.json({ success: false });
        }
    })




//ROUTE FOR LOGIN
router.post("/loginuser",

    [
        //Validation part for the data feilds.

        //Cheaking for valid email
        body('email', 'Write correct Email').isEmail(),

        // password must be at least 5 chars long
        body('password', 'Password should contains atleast 5 chars').isLength({ min: 5 })
    ],

    async function (req, res) {

        try {
            //Storing data into our DB with collection name user

            //Email we get from our frontend
            let email = req.body.email;
            let password = req.body.password;

            //If user matches with same email
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try Login with correct credentials!" });
            }

            const pwdCheak = bcrypt.compare(password , userData.password);
            if (!pwdCheak) {
                return res.status(400).json({ errors: "Try Login with correct credentials!" });
            }

            const data = {
                user : {
                    id : userData._id
                }
            }
            
            //Generating the auth token
            //A auth token has 3 parameters 1. header , 2 . body  , 3. a string
            //we have a const data in which we have stored the user id of the current logged in user
            //we have also a jwtsecret string which is a random one
            const authtoken = jwt.sign(data , jwtsecret);
            
            return res.json({ success: true , authToken : authtoken});
            // res.send("Hello!");
        }
        catch {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;


// The try statement allows you to define a block of code to be tested for errors while it is being executed.
// The catch statement allows you to define a block of code to be executed, if an error occurs in the try block.

// The JavaScript statements try and catch come in pairs:

// try {
//     Block of code to try
//   }
//   catch(err) {
//     Block of code to handle errors
//   }