let Address = require('./model')
let createNewAddress = async (city,
                              labels, user, pinCode,
                              state, country, addressLine1, addressLine2
) => {
    let status = {}
    labels = labels.split(',')
    try {
        let buffer = new Address({
            city, labels, user, pinCode, state, country,
            addressLine1, addressLine2
        })
        await buffer.save()
        status = {success: true, object: buffer}
    } catch (e) {
        console.log(e)
        status = {success: false, message: e.message}
    }

    return status
}

const findAddressOfUser = async (user) => {
    return await Address.find({user})
}

const deleteAddress = async (addressId) => {
    return await Address.deleteOne({_id: addressId})
}

const updateAddress = async (addressId, updateInfo) => {
    return await Address.updateOne({_id: addressId}, {...updateInfo})
}

const searchAddress = async (query)=>{
    return await Address.find({...query})
}

module.exports = {
    createNewAddress,
    findAddressOfUser,
    deleteAddress,
    updateAddress,
    searchAddress
}