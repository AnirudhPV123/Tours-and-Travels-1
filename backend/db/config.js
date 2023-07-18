
const {MongoClient}=require('mongodb')

const url=process.env.MONGODB_URI
const databaseName='tours_and_travels'
const client=new MongoClient(url)    


async function dbConnect(){
 
    let result=await client.connect();
    return result.db(databaseName)
}

module.exports=dbConnect;           