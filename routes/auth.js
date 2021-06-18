const {createNewUser} = require("../models/user/controller");
const router = require('express').Router()
const jwt = require('jsonwebtoken')


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
                const status = await createNewUser(name, email, password)
                console.log('status', status)
                res.sendStatus(200)
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
        if (data.email && data.password) {
            let {email, password} = data
            let status
            try {
                status = await logInUser()
                let payload = {
                    email
                }
                let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN})
                status.accessToken = token
                let refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: process.env.REFRESH_TOKEN_REFRESH_EXPIRES_IN})
                console.log(token, refresh_token)
            } catch (e) {
                console.log(e)
            }

        } else {
            res.sendStatus(402)
        }

    })
module.exports = router
