const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const CertificateSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endData:{
        type:String,
    },
    desc:{
        type:String,
        required:false
    },
    createdBy:{
        type:ObjectId
    }
})

module.exports = mongoose.model('certificate',CertificateSchema)