const {verifyBearerHeader} = require("./middlewares");
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {searchAddress} = require("../models/address/controller");
const {updateAddress} = require("../models/address/controller");
const {deleteAddress} = require("../models/address/controller");
const {findAddressOfUser} = require("../models/address/controller");
const {createNewAddress} = require("../models/address/controller");


const getCurrentUserId = async (req) => {
    let {userId} = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.ACCESS_TOKEN_SECRET)
    return userId
}
router.use(verifyBearerHeader)
router.route('/')
    .get(async (req, res) => {

        try {
            let userId = await getCurrentUserId(req)
            let query = req.query
            if (!query) {
                try {
                    let address = await findAddressOfUser(userId)
                    // console.log(address)
                    res.status(200)
                    res.send(address)
                } catch (e) {
                    console.log(e)
                    res.sendStatus(403)
                }
            } else {
                if (query.labels) query.labels = {$all: query.labels.split(',')}
                console.log('query', query)
                try {
                    let result = await searchAddress(query)
                    res.status(200)
                    res.send(result)
                } catch (e) {
                    res.sendStatus(401)
                }
            }

        } catch (e) {
            res.sendStatus(402)
        }
        // res.send('addresses here')
    })
    .post(async (req, res) => {
        let data = req.body

        let userId = await getCurrentUserId(req)
        console.log('address data', data)
        console.log('added by user id', userId)
        let {city, pinCode, state, labels, addressLine1, country, addressLine2} = data
        try {

            let status = await createNewAddress(city, labels, userId, pinCode, state, country, addressLine1, addressLine2)
            res.status(200)
            res.send(status)
        } catch (e) {
            console.log(e)
            res.sendStatus(403)
        }
    })
    .delete(async (req, res) => {
        let data = req.body
        console.log(data)
        try {
            let deletedAdd = await deleteAddress(data.addressId)
            console.log('delete', deletedAdd)
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(403)
        }
    })
    .patch(async (req, res) => {
        let data = req.body
        console.log('updating Data', data)
        let {addressId} = data
        let updateInfo = {}
        for (let [key, value] of Object.entries(data)) {
            if (key !== 'addressId') {
                updateInfo[key] = value
            }
        }
        try {
            let updateStatus = await updateAddress(addressId, updateInfo)
            console.log(updateStatus)
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(403)
        }
        console.log(addressId, updateInfo)
    })

module.exports = router