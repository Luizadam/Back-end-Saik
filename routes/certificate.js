const express = require('express');
const router = express.Router();
const Certificate = require('../models/users/certificate')
const authLogin = require('../middleware/authLogin')


// get all Certificate by Created
router.get('/certificate/:id',authLogin,(req,res)=>{
    Certificate.find({createdBy:req.params.id},(err,docs)=>{
        if(!err){
            res.status(200).send({message:"Get Data Berhasil",data:docs})
        }else{
            res.status(500).send({message:"Terjadi Kesalahan!",Error:err})
        }
    })
})

// post Certificate
router.post('/certificate',authLogin,(req,res)=>{
    const certificate = new Certificate({
        name :req.body.name,
        publisher:req.body.publisher,
        startDate:req.body.startDate,
        endData:req.body.endData,
        desc:req.body.desc,
        createdBy:req.user.id
    })
    certificate.save()
    .then(data =>{
        res.status(200).send({message:"Post Data Berhasil",data:data})
    })
    .catch(err =>{
        res.status(500).send({message:"Terjadi Kesalahan!",Error:err})
    })
})

// edit Certificate
router.put('/certificate/:id',authLogin,(req,res)=>{
    Certificate.findByIdAndUpdate({_id:req.params.id},
        {
            $set:
            {
                universitas:req.body.nameCertificate,
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

router.delete('/certificate/:id',(req,res)=>{
    Certificate.remove({_id:req.params.id},(err)=>{
        if(!err){
            res.status(200).json({ message: 'Berhasil Menghapus Data' });
        }else{
            res.status(500).json({ message: 'Terjadi Kesalahan Teknis' });
        }
    })
})

module.exports = router;