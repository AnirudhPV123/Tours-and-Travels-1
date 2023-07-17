const express = require("express");
const router = express.Router();
const userHelpers = require('../helpers/user-helpers')
const Jwt = require('jsonwebtoken');
const jwtKey='123';

   
router.post('/signup',async(req,res)=>{
    userHelpers.doSignup(req.body).then((user)=>{         
        Jwt.sign({user},jwtKey,{expiresIn:"30d"},(err,token)=>{
            if(err){
                res.send({result:"something went wrong"})       
            }else{
            res.send({user,auth:token})
        }
        })
    })
})

router.post('/login',async(req,res)=>{
    userHelpers.doLogin(req.body).then((user)=>{         
        if(user.status){
            Jwt.sign({user},jwtKey,{expiresIn:"30d"},(err,token)=>{
                if(err){
                    res.send({result:"something went wrong"})
                }else{
                res.send({user:user.user,auth:token})
            }
            }) 
        }else{        
            res.send({result:"No user found"})                
        }
    })
})
             
router.get('/get-products', async(req,res)=>{
    userHelpers.getProducts().then((products)=>{           
        if(products){
            res.send(products)
        }else{
            res.send({result:"products not found"})
        }
    })
})


router.get('/book-now-details/:id',verifyToken, async(req,res)=>{
    userHelpers.bookNowDetails(req.params.id).then((details)=>{
        
        if(details){
            res.send(details)
        }else{          
            res.send({result:"something went wrong"})
        } 
    })
})


router.post('/product-booked',verifyToken, async(req,res)=>{
    if(req.body.bookingDetails.payment=='COD'){
        req.body.orderStatus='placed'
    }

    userHelpers.productBooked(req.body).then((data)=>{
        
        if(req.body.bookingDetails.payment=='COD'){
            res.send(data)
        }else{
            userHelpers.generateRazorpay(data.orderId,req.body.bookingDetails.totalAmount).then((response)=>{
                if(response){
                    res.send(response)
                }else{
                    res.send()
                }
            })
        }

    })
})


router.post('/verify-payment',verifyToken,async(req,res)=>{
    userHelpers.verifyPayment(req.body).then(() => {
        userHelpers.changePaymentStatus(req.body.order.receipt).then(() => {
          res.send({ status: true })
        })
      }).catch((err) => {
        res.send({status:false,message:err})
      })
})


router.post('/post-review',verifyToken, async(req,res)=>{  
    userHelpers.postReview(req.body).then((response)=>{
      if(response){
        res.send(response)
      }else{
        res.send({result:"Must required to book tour..."})
      }
})     
})                          


router.get('/get-reviews/:id',verifyToken, async(req,res)=>{
    userHelpers.getReview(req.params.id).then((reviews)=>{
        if(reviews){
            res.send(reviews)
        }else{
            res.send()
        }
    })
})


router.post('/add-to-cart',verifyToken,async(req,res)=>{
    userHelpers.addToCart(req.body).then((response)=>{
        if(response.added){
            res.send(response)
        }else if(response.exist){
            res.send(response)
        }
        else{
            res.send()
        }
    })
})


router.get('/get-cart-items/:id',verifyToken,async(req,res)=>{
    userHelpers.getCartItems(req.params.id).then((response)=>{
        if(response){
            res.send(response)
        }else{
            res.send()
        }
    })
})

router.post('/delete-cart-item',verifyToken,async(req,res)=>{
    userHelpers.deleteCartItem(req.body).then((response)=>{
        res.send()
    })
})

router.get('/search/:q',async(req,res)=>{

    const keys = ["place", "country"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(req.params.q))
      );
    };

    userHelpers.getProducts().then((products)=>{
        res.send(search(products))
    })
    

})


router.post('/update-profile-image',verifyToken,async(req,res)=>{
    userHelpers.updateProfileImage(req.body).then(()=>{
res.send()
    })
})

router.post('/update-profile-name',verifyToken,async(req,res)=>{
    userHelpers.updateProfileName(req.body).then(()=>{
res.send()
    })
})


router.get('/get-profile-image/:id',verifyToken,async(req,res)=>{
    userHelpers.getProfileImage(req.params.id).then((image)=>{
        if(image){
            res.send(image)
        }else{
            res.send({result:"No profile image is found"})
        }
    })
})
                           

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



module.exports=router;