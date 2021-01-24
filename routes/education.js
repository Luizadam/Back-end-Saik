const express = require('express');
const router = express.Router();
const Education = require('../models/users/education')
const authLogin = require('../middleware/authLogin')


// get all Education by Created
router.get('/education/:id',authLogin,(req,res)=>{
    Education.find({createdBy:req.params.id},(err,docs)=>{
        if(!err){
            res.status(200).send({message:"Get Data Berhasil",data:docs})
        }else{
            res.status(500).send({message:"Terjadi Kesalahan!",Error:err})
        }
    })
})

// post Education
router.post('/education',authLogin,(req,res)=>{
    const education = new Education({
        universitas:req.body.universitas,
        gelar:req.body.gelar,
        startDate:req.body.startDate,
        endData:req.body.endData,
        desc:req.body.desc,
        createdBy:req.user.id
    })
    education.save()
    .then(data =>{
        res.status(200).send({message:"Post Data Berhasil",data:data})
    })
    .catch(err =>{
        res.status(500).send({message:"Terjadi Kesalahan!",Error:err})
    })
})

// edit Education
router.put('/education/:id',authLogin,(req,res)=>{
    Education.findByIdAndUpdate({_id:req.params.id},
        {
            $set:
            {
                universitas:req.body.nameEducation,
                gelar:req.body.perusahaan,
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

router.delete('/education/:id',(req,res)=>{
    Education.remove({_id:req.params.id},(err)=>{
        if(!err){
            res.status(200).json({ message: 'Berhasil Menghapus Data' });
        }else{
            res.status(500).json({ message: 'Terjadi Kesalahan Teknis' });
        }
    })
})

module.exports = router;