const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex(
    {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : '1061375',
            database : 'smartbrain'
        }
    }
);

db.select('*').from('users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('It is working at last!'));

app.post('/signin', (req, res) => signin.handleSignin(req, res, bcrypt, db));
// handles our sign in form

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
// handles our register in form

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
// handles our profile data

app.put('/image', (req, res) => image.imageHandler(req, res, db));
// handles rank

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));
// handles face detection


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});
