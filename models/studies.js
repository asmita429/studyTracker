const mongoose = require('mongoose');       //

const StudySchema = mongoose.Schema({     //database schema
    title : String,
    description : String,
    // amount : Number,
    // paidBY : String,
    createdBy : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Expenses', StudySchema);