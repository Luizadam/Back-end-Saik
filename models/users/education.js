const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const EducationSchema = mongoose.Schema({
    universitas:{
        type:String,
        required:true
    },
    gelar:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endData:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:false
    },
    createdBy:{
        type:ObjectId
    }
})

module.exports = mongoose.model('education',EducationSchema)