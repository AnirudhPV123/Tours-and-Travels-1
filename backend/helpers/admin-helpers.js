const dbConnect = require('../db/config')
const collections = require('../db/collections')
const { response } = require('express')
const objectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')


module.exports={
    addProduct:(product)=>{
        return new Promise (async(resolve,reject)=>{

          const db = await dbConnect()
          db.collection(collections.PRODUCTS_COLLECTION).insertOne(product).then((response)=>{
            resolve(response)
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

      deleteProduct:(productId)=>{
        return new Promise(async(resolve,reject)=>{
          const db = await dbConnect()
          db.collection(collections.PRODUCTS_COLLECTION).deleteOne({_id:new objectId(productId)}).then((response)=>{
            try{
              resolve(response)
            }catch(err){
              resolve()
            }
          })
        })
      },

      getProductDetails:(productId,image)=>{
        return new Promise(async(resolve,reject)=>{
          const db = await dbConnect()
          // db.collection(collections.PRODUCTS_COLLECTION).findOne({_id:new objectId(productId)}).then((response)=>{
          //   try{
          //     resolve(response)
          //   }catch(err){
          //     resolve()
          //   }
          // })
          db.collection(collections.PRODUCTS_COLLECTION).aggregate([
           {
            $match:{_id:new objectId(productId)}
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
          ]).toArray().then((products) => {
            try{
              resolve(products)
            }catch(err){
              resolve()
            }
          })
        })
      },

      updateProduct:(productId,details)=>{
        return new Promise(async(resolve,reject)=>{
          const db = await dbConnect()
          db.collection(collections.PRODUCTS_COLLECTION).updateOne({_id:new objectId(productId)},
          {$set:
            {place:details.place,
              country:details.country,
              feature:details.feature,
              price:details.price,
              desc:details.desc,
              image200:details.image200,
              image300:details.image300,
              image400:details.image400,
              image500:details.image500,
              image750:details.image750,
              image1000:details.image1000
            }}).then((response)=>{
            try{
              resolve(response)
            }catch(err){          
              resolve()
            }
          })
        })
      },


      addAdmin:(admin)=>{
        return new Promise(async(resolve,reject)=>{

          admin.password = await bcrypt.hash(admin.password, 10)
          const db = await dbConnect()
          db.collection(collections.ADMIN_COLLECTION).insertOne(admin).then((response)=>{
            try{
              resolve(response)
            }catch(err){
              resolve()
            }
          })
        })
      },

      doLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
          const db = await dbConnect()
          db.collection(collections.ADMIN_COLLECTION).findOne({ email: adminData.email }).then((admin) => {
            if (admin) {
              bcrypt.compare(adminData.password, admin.password).then((status) => {
                if (status) {     
                  admin.password = undefined
                  admin.profileImage=undefined
                  response.admin = admin
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
      
      getUserDetails:()=>{
        return new Promise(async(resolve,reject)=>{
          const db = await dbConnect()
          db.collection(collections.USERS_COLLECTION).find().toArray().then((response)=>{                               
            try{
              resolve(response)
            }catch(err){
              resolve()
            }
          })
        })
      },

      getBookedDetails:()=>{
        return new Promise(async(resolve,reject)=>{
          const db = await dbConnect()
          db.collection(collections.BOOKED_COLLECTION).aggregate([
            {
              $project: {
                name: '$personalDetails.name',
                mobile: '$personalDetails.mobile',
                noOfPersons:'$bookingDetails.noOfPersons',
                tourDate:'$bookingDetails.tourDate',
                payment:'$bookingDetails.payment',
                totalAmount:'$bookingDetails.totalAmount',
                orderStatus:'$orderStatus',
                productId:{$toObjectId:'$productId'}
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
            }

          ]).toArray().then((response)=>{
              try{
                resolve(response)
              }catch(err){
                resolve()
              }
          })
        })
      },

      getAdminDetails:()=>{
        return new Promise(async(resolve,reject)=>{
          const db = await dbConnect()
          db.collection(collections.ADMIN_COLLECTION).find().toArray().then((response)=>{                               
            try{
              resolve(response)
            }catch(err){
              resolve()
            }
          })
        })
      },

      deleteAdmin:(adminId)=>{
        return new Promise(async(resolve,reject)=>{
          const db = await dbConnect()
          db.collection(collections.ADMIN_COLLECTION).deleteOne({_id:new objectId(adminId)}).then((response)=>{
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
        db.collection(collections.ADMIN_COLLECTION).updateOne({_id:new objectId(details.userId)},{$set:{profileImage:details.profileImage}}).then(()=>{
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
        db.collection(collections.ADMIN_COLLECTION).aggregate([
          {
            $match:{_id:new objectId(userId)}
          },
          {
            $project:{profileImage:'$profileImage'}
          }
        ]).toArray().then((response)=>{
            // if(response[0].profileImage){
            //   resolve(response[0].profileImage)
            // }else{
            //   resolve()
            // }

            try{
              resolve(response[0].profileImage)
            }catch(err){
              resolve()
            }
        })
      })
      }


}   