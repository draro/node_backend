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

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))
app.put('/image', (req, res) => profile.handleImage(req, res, db))

app.listen(3001, () => {
    console.log('app is running on port 3001')
})
