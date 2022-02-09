const express = require('express')
const cors = require ('cors')
const users = require("../server/users.json")
const app = express()
const port = 5000

let globalId = 2

app.use(cors())
app.use(express.json())

// app.get to receive stored user information 


// app.post to store input information
const createUser = (req, res) => {
    let {firstName, lastName, email, password} =req.body
    
    let newUser = {
        id: globalId,
        firstName,
        lastName,
        email,
        password
    }

    users.push(newUser);
    res.status(200).send(newUser);
    globalId++;
}
app.post('/stationery/user', createUser)

const getUser = (req, res) => {
    console.log(req.params)
    let reqId = req.params.userId
    let result = users.filter(elem => +elem.id === +reqId)

    console.log('what is result', result, users)

    res.status(200).send(result[0])
    return;
}
app.get('/stationery/user/:userId', getUser)


// login
const loginUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (email && password) {
        let login = users.filter(elem => elem.email === email && elem.password === password)
        // if (login.length > 0){
        //     res.status(200).send('user found')
        // } else{
        //     res.status(400).send('user not found')
        // }
        login.length > 0 ? res.status(200).send({message: `hello ${login[0].firstName}`, isLoggedIn: true}) : res.status(200).send({message: `did not find user, please try again to login`, isLoggedIn: false})
    } else {
        // res.writeHead(400, 'invalid entry, please try again', {'content-type': 'text/plain'})
        res.status(400).send('invalid entry, please try again') 
    }
    return;
}
app.post('/stationery/login', loginUser)


app.listen(port, () => {
    console.log(`Lab server listening at http://localhost:${port}`)
  })