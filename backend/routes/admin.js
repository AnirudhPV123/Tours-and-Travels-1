const express = require("express");
const router = express.Router();
const adminHelpers = require('../helpers/admin-helpers')
const Jwt = require('jsonwebtoken');
const jwtKey='123';

router.post('/add-product',verifyToken,async(req,res)=>{
    adminHelpers.addProduct(req.body).then((response)=>{
        res.send(response)
    })
})

router.get('/get-products',verifyToken, async(req,res)=>{
    adminHelpers.getProducts().then((products)=>{           
        if(products){
            res.send(products)
        }else{
            res.send({result:"products not found"})
        }
    })
})

router.delete('/delete-product/:id',verifyToken,async(req,res)=>{
    adminHelpers.deleteProduct(req.params.id).then((response)=>{
        if(response){
            res.send()
        }else{
            res.send({result:"Tour not deleted"})
        }
    })
})

router.get('/get-product-details/:id',verifyToken,async(req,res)=>{
    adminHelpers.getProductDetails(req.params.id).then((response)=>{
        if(response){
            res.send(response)
        }else{
            res.send()
        }
    })
})

router.post('/update-product/:id',verifyToken,async(req,res)=>{
    adminHelpers.updateProduct(req.params.id,req.body).then((response)=>{
        if(response){
            res.send()
        }else{
            res.send({result:"Product not added..."})
        }
    })
})

router.post('/add-admin',verifyToken,async(req,res)=>{
    adminHelpers.addAdmin(req.body).then((response)=>{
        res.send()
    })
})

router.post('/login',async(req,res)=>{
    adminHelpers.doLogin(req.body).then((admin)=>{
        if(admin.status){
            Jwt.sign({admin},jwtKey,{expiresIn:"30d"},(err,token)=>{
                if(err){
                    res.send({result:"something went wrong"})
                }else{
                res.send({admin:admin.admin,auth:token})
            }
            })
        }else{  
            res.send({result:"No user found"})
        }
    })
})

router.get('/getUserDetails',verifyToken,async(req,res)=>{
    adminHelpers.getUserDetails().then((response)=>{
        if(response){
            res.send(response)
        }else{
            res.send({result:"Something went wrong"})
        }
    })
})

router.get('/get-booked-details',verifyToken,async(req,res)=>{
    adminHelpers.getBookedDetails().then((response)=>{
        if(response){
            res.send(response)
        }else{
            res.send({result:"Something went wrong"})
        }
    })
})

router.get('/getAdminDetails',verifyToken,async(req,res)=>{
    adminHelpers.getAdminDetails().then((response)=>{
        if(response){
            res.send(response)
        }else{
            res.send({result:"Something went wrong"})
        }
    })
})

router.delete('/admin-delete/:id',verifyToken,async(req,res)=>{
    adminHelpers.deleteAdmin(req.params.id).then((response)=>{
        if(response){
            res.send()
        }else{
            res.send({result:"Admin not deleted"})
        }
    })
})


router.post('/update-profile-image',verifyToken,async(req,res)=>{
    adminHelpers.updateProfileImage(req.body).then(()=>{
res.send()
    })
})


router.get('/get-profile-image/:id',verifyToken,async(req,res)=>{
    adminHelpers.getProfileImage(req.params.id).then((image)=>{
        if(image){
            res.send(image)
        }else{
            res.send({result:"No profile image is found"})
        }
    })
})




module.exports=router;                                                                  

function verifyToken(req,res,next){  
    let token = req.headers['authorization']   
    
    if(token){ 
        token = token.split(' ')[1] 
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.send({result:"Please provide valid token"})
            }else{
                next()
            }                
        })   
    }else{
        res.send({err:"Please provide token"})
    }
     
}