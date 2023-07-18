const express = require('express');
const app = express();
const cors = require('cors')

require('dotenv/config') //for env




//import router
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')


//middleware
app.use(express.json({limit: '10mb'}));  //expand json receiving size
app.use(cors())



//routes
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)



//run server
app.listen(5001)       