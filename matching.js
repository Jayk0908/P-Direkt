const router = require("express").Router()
const pool = require("../db")
const bcrypt = require('bcrypt')
const jwtGenerator = require("../utils/jwtGenerator")
const jwtGeneratorPub = require("../utils/jwtGeneratorPub")
const validinfo=require("../Middleware/validinfo")
const authorization = require("../Middleware/authorization")

//check jwt token
// router.post("/matchUsers", async (req, res) => {
//     try {
//         console.log(15)
//         const {userId} = req.body
//         console.log(16)
//         const currentinterestId = await  pool.query(
//             "SELECT interest_id FROM user_interests where user_id = $1",
//             [userId] 
//         )
//         console.log(17)
//         res.json("1234")
//     } catch (error) {
//         console.log(error.message)
// }
// })
// module.exports = router

