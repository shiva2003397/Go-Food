const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data

    await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)

    // console.log(req.body);

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)


    if (eId===null) {
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                return res.json({ success: true , email : req.body.email})
            })
        } catch (error) {
            console.log(error.message)
            return res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    return res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            return res.send("Server Error", error.message)
        }
    }

    // res.send("Requested!");
})

router.post("/myorderData" , async function (req , res) {
    try {
        
        console.log(req.body.email);
        let myData = await Order.findOne({'email' : req.body.email});

        return res.json({orderData : myData});
    } 
    catch (error) {
        return res.send(error);
    }
})

module.exports = router;