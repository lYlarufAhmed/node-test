const mg = require('mongoose')

async function createConnection() {
    console.log('Welcome to my Address Management DB.')
    await mg.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

}

module.exports = createConnection

