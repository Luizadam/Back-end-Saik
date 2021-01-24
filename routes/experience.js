const express = require('express');
const router = express.Router();
const Experience = require('../models/users/experience')
const authLogin = require('../middleware/authLogin')


// get all experience by Created
router.get('/experience/:id',authLogin,(req,res)=>{
    Experience.find({createdBy:req.params.id},(err,docs)=>{
        if(!err){
            res.status(200).send({message:"Get Data Berhasil",data:docs})
        }else{
            res.status(500).send({message:"Terjadi Kesalahan!",Error:err})
        }
    })
})

// post Experience
router.post('/experience',authLogin,(req,res)=>{
    const experience = new Experience({
        nameExperience:req.body.nameExperience,
        perusahaan:req.body.perusahaan,
        startDate:req.body.startDate,
        endData:req.body.endData,
        desc:req.body.desc,
        createdBy:req.user.id
    })
    experience.save()
    .then(data =>{
        res.status(200).send({message:"Post Data Berhasil",data:data})
    })
    .catch(err =>{
        res.status(500).send({message:"Terjadi Kesalahan!",Error:err})
    })
})

// edit experience
router.put('/experience/:id',authLogin,(req,res)=>{
    Experience.findByIdAndUpdate({_id:req.params.id},
        {
            $set:
            {
                nameExperience:req.body.nameExperience,
                perusahaan:req.body.perusahaan,
                startDate:req.body.startDate,
                endData:req.body.endData,
                desc:req.body.desc,
                createdBy:req.user.id  
            }
        })
        .then(res =>{
            res.status(200).send({message:"Edit Data Berhasil",data:res})
        })
        .catch(err =>{
            res.status(500).send({message:"Terjadi Kesalahan Saat Mengedit Data!",Error:err})
        })
    
})

router.delete('/experience/:id',(req,res)=>{
    Experience.remove({_id:req.params.id},(err)=>{
        if(!err){
            res.status(200).json({ message: 'Berhasil Menghapus Data' });
        }else{
            res.status(500).json({ message: 'Terjadi Kesalahan Teknis' });
        }
    })
})

module.exports = router;