
const {MongoClient}=require('mongodb')

const url=process.env.MONGODB_URI
const client=new MongoClient(url)    


async function dbConnect(){
 
    let result=await client.connect();
    return result.db()
}

module.exports=dbConnect;           
