const mongoose = require('mongoose')


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const RegistSchema = mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    noTlpn:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordLink:{
        data:String,
        default:''
    },
    verifikasi:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }

})


module.exports = mongoose.model('regist_company',RegistSchema);