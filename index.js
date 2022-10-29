const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb'); /* install mongoDB */

app.use(cors())/* to solve cors policy issue */
app.use(express.json())/* to get data from client side */

app.get('/', (req, res) => {
    res.send('node server running')
})

const users = [
    { id: 1, name: 'rasal', email: 'rasal@gmail.com' },
    { id: 2, name: 'romel', email: 'romel@gmail.com' },
    { id: 3, name: 'refat', email: 'refat@gmail.com' },
    { id: 4, name: 'rohan', email: 'rohan@gmail.com' }
]

// app.get('/users', (req, res) => {
//     // console.log(req.query)

//     // filter users by name as query
//     if (req.query.name) {
//         const search = req.query.name
//         const filteredUser = users.filter(user => user.name.indexOf(search) >= 0)
//         res.send(filteredUser)
//     }
//     else {
//         res.send(users)
//     }
// })

// /* get data from client side */
// app.post('/users', (req, res) => {
//     // console.log('post api called')
//     const user = req.body
//     user.id = users.length + 1;
//     users.push(user)
//     res.send(user)
//     // console.log(req.body)
//     console.log(user)
// })


/*-----------------------------
 integrate mongoDB with server 
 -----------------------------*/
const uri = "mongodb+srv://mostafiz:9Movn96GNAGBl8Gd@cluster0.mniec4l.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/*-----------------------
 add new data to mongoDB 
 -----------------------*/
async function run() {
    try {
        const userCollection = client.db('ExploreNode').collection('users');
        // const user = { name: 'shiuli', email: 'shiuli@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        /*-------------------------------------------------
        get data from MongoDB and client side, save data to MongoDB and show/display in UI --------------------------------------------------*/
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray();
            res.send(users);
        })

        /*-----------------------------
         get data from client side 
         -----------------------------*/
        app.post('/users', async (req, res) => {
            // console.log('post api called')
            const user = req.body
            // user.id = users.length + 1;
            // users.push(user)
            const result = await userCollection.insertOne(user);
            user._id = result.insertedId;
            res.send(user)
            // console.log(req.body)
            console.log(user)
        })

    }
    finally {

    }
}

run().catch(err => console.error(err))


app.listen(port, () => {
    console.log(`node server is running on port ${port}`)
})
