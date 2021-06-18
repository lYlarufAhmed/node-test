const {createNewUser} = require("../models/user/controller");
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {logInUser} = require("../models/user/controller");


router.route('/')
    .get(async (req, res) => {
        //TODO:jwt token creation
        res.send('auth here')
    })
    .post(async (req, res) => {
        let data = req.body
        console.log('data', data.email)
        if (
            (data.password === data.confirmPassword)
            &&
            data.name && data.password && data.email
        ) {
            let {name, email, password} = data
            try {
                let refresh_token = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: process.env.REFRESH_TOKEN_REFRESH_EXPIRES_IN})
                const status = await createNewUser(name, email, password, refresh_token)
                console.log('status', status)
                res.status(200)
                res.send({success: true, refresh_token})
            } catch (e) {
                console.log(e)
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(402)
        }
    })
router.route('/login')
    .post(async (req, res) => {
        let data = req.body
        console.log('data', data)
        let status
        if (data.email && data.password) {
            let {email, password} = data
            try {
                status = await logInUser(email, password)
                if (status.success) {
                    let payload = {
                        userId: status.loggedInUser._id
                    }
                    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN})
                    status.accessToken = token
                    console.log(token)
                }

            } catch (e) {
                console.log(e)
            }

        } else {
            res.sendStatus(402)
        }
        res.send(status)

    })
module.exports = router
