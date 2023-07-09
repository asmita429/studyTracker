const mongoose = require('mongoose');       //

const StudySchema = mongoose.Schema({     //database schema
    title : String,
    description : String,
    time: Number,
    createdAt : {
        type : Date,
        default : Date.now
    },
    deadLine : { type : Date },
    done : {
        type: Boolean,
        default : false
    } 
})

module.exports = mongoose.model('Expenses', StudySchema);