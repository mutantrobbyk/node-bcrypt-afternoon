require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('../controllers/authController')
const treasureCtrl = require('../controllers/treasureController')
const app = express()
const PORT = 4000

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', treasureCtrl.getUserTreasure)







massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

    })

