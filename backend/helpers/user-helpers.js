const dbConnect = require('../db/config')
const collections = require('../db/collections')
const bcrypt = require('bcrypt')
const { response } = require('express')
const objectId = require('mongodb').ObjectId
const Razorpay = require('razorpay')
const { resolve } = require('path')

var instance = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_SECRET_KEY 
})


module.exports = {
  doSignup: (user) => {
    return new Promise(async (resolve, reject) => {
      user.password = await bcrypt.hash(user.password, 10)
      const db = await dbConnect()
      db.collection(collections.USERS_COLLECTION).insertOne(user).then((response) => {
        db.collection(collections.USERS_COLLECTION).findOne({ _id: response.insertedId }).then((response) => {
          response.password = undefined
          response.profileImage=undefined
          resolve(response)
        })
      })
    })
  },

  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      const db = await dbConnect()
      db.collection(collections.USERS_COLLECTION).findOne({ email: userData.email }).then((user) => {
        if (user) {
          bcrypt.compare(userData.password, user.password).then((status) => {
            if (status) {
              user.password = undefined
              user.profileImage=undefined
              response.user = user
              response.status = true
              resolve(response)

            } else {
              response.status = false
              resolve(response)
            }
          })
        } else {
          response.status = false
          resolve(response)
        }
      })
    })
  },

  getProducts: (image) => {
    return new Promise(async (resolve, reject) => {
      const db = await dbConnect()
      db.collection(collections.PRODUCTS_COLLECTION).aggregate([
        {
          $project:{
            place:'$place',
            country:'$country',
            feature:'$feature',
            price:'$price',
            desc:'$desc',
            postImage:`$${image}`
          }
        }
      ]).toArray().then((products) => {
        resolve(products)
      })
    })
  },          

  bookNowDetails: (id,image) => {
    return new Promise(async (resolve, reject) => {
      const db = await dbConnect()
      db.collection(collections.PRODUCTS_COLLECTION).aggregate([
        {
          $match:{ _id: new objectId(id)}
        },
        {
          $project:{
            place:'$place',
            country:'$country',
            feature:'$feature',
            price:'$price',            
            desc:'$desc',
            postImage:`$${image}`
          }
        }                     
      ]).toArray().then((details) => {
        try {
          resolve(details)
        } catch (err) {
          resolve()
        }
      }) 
    })
  },

  productBooked: (details) => {
    return new Promise(async (resolve, reject) => {
      const db = await dbConnect()
      db.collection(collections.BOOKED_COLLECTION).insertOne(details).then((response) => {
        try {
          data = {
            status: details.orderStatus,
            orderId: response.insertedId
          }
          resolve(data)
        } catch (err) {
          resolve()
        }


      })
    })
  },


  postReview: (post) => {
    return new Promise(async (resolve, reject) => {
      const db = await dbConnect()
      // db.collection(collections.REVIEW_COLLECTION).insertOne(post).then((response)=>{
      //   resolve(response)
      // })

      db.collection(collections.BOOKED_COLLECTION).findOne({ userId: post.userId }, { productId: post.productId }).then((response) => {
        if (response == null) {
          resolve()
        } else {
          db.collection(collections.REVIEW_COLLECTION).insertOne(post).then((result) => {
            resolve(result)
          })
        }
      })


    })
  },

  getReview: (id) => {
    return new Promise(async (resolve, reject) => {
      const db = await dbConnect()
      db.collection(collections.REVIEW_COLLECTION).find({ productId: id }).toArray().then((reviews) => {
        try {
          resolve(reviews)
        } catch (err) {
          resolve()
        }
      })
    })
  },
         
  // razorpay integration

  generateRazorpay:(orderId,total)=>{
    return new Promise(async(resolve,reject)=>{
      var options={
        amount: total*100,
        currency: "USD",
        receipt:""+orderId
      }

      instance.orders.create(options,function(err,order){
        if(err){
          resolve()
        }else{
          resolve(order)
        }
      })
  

    })
  },

  
  verifyPayment:(details)=>{
    return new Promise((resolve,reject)=>{
      const crypto=require('crypto')
      const hash=crypto.createHmac('sha256','K2K6l2evaZ6WxLoGIpHeVy5F').update(details.payment.razorpay_order_id+'|'+details.payment.razorpay_payment_id).digest('hex')
      if(hash==details.payment.razorpay_signature){
        resolve()
      }else{
        reject()
      }

    })
  },

  changePaymentStatus:(orderId)=>{
    return new Promise(async(resolve,reject)=>{
      const db = await dbConnect()
      db.collection(collections.BOOKED_COLLECTION).updateOne({_id:new objectId(orderId)},
      {$set:{orderStatus:"placed"}}
      ).then(()=>{
        resolve()
      })
    })
  },

  addToCart:(cartItem)=>{
    let proObj = {
      productId:cartItem.productId
    }
    
    let cartObj = {
      userId: cartItem.userId,
      products: [proObj]
    }

    return new Promise(async(resolve,reject)=>{
      const db = await dbConnect()

      db.collection(collections.CART_COLLECTION).findOne({userId:cartItem.userId}).then((userCart)=>{
        if(userCart){
          let proExist = userCart.products.findIndex(product => product.productId == cartItem.productId)
          if(proExist==-1){
            db.collection(collections.CART_COLLECTION).updateOne({userId:cartItem.userId},
              {
                $push:{products:proObj}
              }).then((response)=>{
                response.added='product added'
                resolve(response)
              })
          }else{
            response.exist='product already exist'
            resolve(response)
          }
        }else{
          db.collection(collections.CART_COLLECTION).insertOne(cartObj).then((response)=>{
            try{
              response.added='product added'
              resolve(response)
            }catch(err){
              resolve()
            }
          })            
        }
      })
  })
    },

    getCartItems:(userId,image)=>{
      return new Promise(async(resolve,reject)=>{
        const db = await dbConnect()
        const cartItems = await db.collection(collections.CART_COLLECTION).aggregate([
          {
            $match:{userId:userId}
          },
          {
            $unwind:'$products'
          },
          {
            $project:{
              // productId:'$products.productId',
              productId:{
                $toObjectId:'$products.productId'
              }
            }
          },
          {
            $lookup:{
              from:collections.PRODUCTS_COLLECTION, 
              localField:'productId',
              foreignField:'_id',
              as:'product'
            }
          },
          {
            $unwind:'$product'
          },
          {
            $project:{
              place:'$product.place',
              country:'$product.country',
              feature:'$product.feature',
              price:'$product.price',                       
              desc:'$product.desc',
              postImage:`$product.${image}`,
              productId:'$product._id'
            }
          }
        ]).toArray()
        try{          
          resolve(cartItems)
        }catch(err){
          resolve()
        }
      })                                
    },

    deleteCartItem:async(proDetails)=>{
      return new Promise(async(resolve,reject)=>{

        const db = await dbConnect()
        db.collection(collections.CART_COLLECTION).updateOne({userId:proDetails.userId},
          {
            $pull:{products:{productId:proDetails.productId}}
          }).then((response)=>{
            try{
              resolve(response)
            }catch(err){
              resolve()
            }
          })
        })

    },


    updateProfileImage:async(details)=>{
      return new Promise(async(resolve,reject)=>{
      const db = await dbConnect()
      db.collection(collections.USERS_COLLECTION).updateOne({_id:new objectId(details.userId)},{$set:{profileImage:details.profileImage}}).then(()=>{
        try{
          resolve()
        }catch(err){
          resolve()
        }
      })
    })
    },

    
    updateProfileName:async(details)=>{
      return new Promise(async(resolve,reject)=>{
      const db = await dbConnect()
      db.collection(collections.USERS_COLLECTION).updateOne({_id:new objectId(details.userId)},{$set:{name:details.editName}}).then(()=>{
        try{
          resolve()
        }catch(err){
          resolve()
        }
      })
    })
    },

    getProfileImage:async(userId)=>{
      return new Promise(async(resolve,reject)=>{
      const db = await dbConnect()
      db.collection(collections.USERS_COLLECTION).aggregate([
        {
          $match:{_id:new objectId(userId)}
        },
        {
          $project:{profileImage:'$profileImage'}
        }
      ]).toArray().then((response)=>{
        try{
          resolve(response[0].profileImage)
        }catch(err){
          resolve()
        }
      })
    })
    }



  }         
                              
