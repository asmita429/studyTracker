const mongoose = require('mongoose');       //

const LoginSchema = mongoose.Schema({     //database schema
    name : String,
    password : Number
})

module.exports = mongoose.model('Logins', LoginSchema);