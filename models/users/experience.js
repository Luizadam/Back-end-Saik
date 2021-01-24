const { string } = require('@hapi/joi')
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const ExperienceSchema = mongoose.Schema({
    nameExperience:{
        type:String,
        required:true
    },
    perusahaan:{
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

module.exports = mongoose.model('experience',ExperienceSchema)