const express = require('express');
const {insertUser, listUsers, validateAuth } = require('./register')

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());
app.use(express.json());

app.get('/', async (req, res)=> {
    let users = await listUsers();

    res.render('index',{ users: users })
});

app.get('/register', async (req, res) => {

    res.render("register")
});

app.get('/login', (req, res) => {
    
    res.render("login");
});

app.post('/login', async (req, res) => {

    const {email, password} = req.body;
    const loginUser = {
        email,
        password
    }
    const auth = await validateAuth(loginUser);
    auth ? res.redirect('/'): res.render('login');
});

app.post('/register', async (req, res) => {

    const {name, email, password} = req.body;
    const newUser = {
        name,
        email,
        password
    }
    await insertUser(newUser);
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    res.redirect('/login');
});

app.listen(3000, () => console.log(`Listening on the port 3000!`)); 
