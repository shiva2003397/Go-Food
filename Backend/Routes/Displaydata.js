const express = require("express");
const router = express.Router();


router.post("/foodData" , function (req , res) {
    try {
        // console.log(global.food_iteams);
        // console.log(global.food_category);
        res.send([global.food_iteams , global.food_category]);
    }
    catch {
        console.log(error);
        res.send("Server Error");
    }
})

module.exports = router;