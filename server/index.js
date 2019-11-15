require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require('./authController')
const ctrl = require('./controller')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

// AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

// Controller ENDPOINTS
app.get('/api/posts', ctrl.getPosts)
app.post('/api/posts', ctrl.addPost)
app.get('/api/posts/:id', ctrl.getOne)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () =>
        console.log(`Listening on Port ${SERVER_PORT}`)
    )
})
