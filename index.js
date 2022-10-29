const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

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

app.get('/users', (req, res) => {
    // console.log(req.query)
    // filter users by name as query
    if (req.query.name) {
        const search = req.query.name
        const filteredUser = users.filter(user => user.name.indexOf(search) >= 0)
        res.send(filteredUser)
    }
    else {
        res.send(users)
    }
})

/* get data from client side */
app.post('/users', (req, res) => {
    // console.log('post api called')
    const user = req.body
    user.id = users.length + 1;
    users.push(user)
    res.send(user)
    // console.log(req.body)
    console.log(user)
})

app.listen(port, () => {
    console.log(`node server is running on port ${port}`)
})
