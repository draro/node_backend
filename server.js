const express = require('express')
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5433',
        user: 'postgres',
        password: 'rugby4ever',
        database: 'smart-brain'
    }
});


const app = express();
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => res.send(database.users))

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleAPICall(req, res) })

app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})
