let User = require('./model')
let bcrypt = require('bcrypt')
const emailREGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

let createNewUser = async (name, email, password, token) => {
    let status = {}
    if (!emailREGEX.test(email)) status = {success: false, message: 'Invalid email!'}
    else {
        let hashed = await bcrypt.hash(password, 12)
        console.log('hashed', hashed)
        try {
            let buffer = new User({name, email, password: hashed, refreshToken:token})
            await buffer.save()
            buffer['password'] = ''
            status = {success: true, object: buffer}
        } catch (e) {
            console.log(e)
            status = {success: false, message: e.message}
        }
    }

    return status
}
let checkHash = async (_id, password) => {
    try {
        let requestedUser = await User.findOne({_id})
        let matched = await bcrypt.compare(password, requestedUser.password)
        if (matched)
            return {success: true, requestedUser}
        else return {success: false, message: 'Invalid password!'}
    } catch (e) {
        console.log(e)
        return {success: false, message: e.message}
    }
}
let findUserByEmail = async (email) => {
    try {
        return await User.findOne({email})
    } catch (e) {
        console.log(e)
        return {success: false, message: e.message}
    }
}

let logInUser = async (email, password) => {
    let searchedUser = await findUserByEmail(email)
    console.log(searchedUser)
    if (searchedUser) {
        let checkResult = await checkHash(searchedUser._id, password)
        if (checkResult) {
            searchedUser.password = ''
            return {success: true, loggedInUser: searchedUser}
        } else {
            return {success: false, message: 'email or password does not matched'}
        }
    } else {
        return {success: false, message: 'email or password does not matched'}
    }
}

module.exports = {
    createNewUser,
    logInUser
}
