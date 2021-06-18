const router = require('express').Router()



router.route('/')
    .get(async (req, res)=>{
        res.send('addresses here')
    })






module.exports = router