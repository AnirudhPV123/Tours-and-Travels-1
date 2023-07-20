
const {MongoClient}=require('mongodb')

const url=process.env.MONGODB_URI
<<<<<<< HEAD
// const databaseName='tours_and_travels'
=======
>>>>>>> cbe2d55023898dcf6a26020a7d369f3f1ecff5ec
const client=new MongoClient(url)    


async function dbConnect(){
 
    let result=await client.connect();
<<<<<<< HEAD
    // return result.db()
=======
>>>>>>> cbe2d55023898dcf6a26020a7d369f3f1ecff5ec
    return result.db()
}

module.exports=dbConnect;           
