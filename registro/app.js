const express = require('express');
const { insertUser, listUsers, validateAuth } = require("./user");

const app = express();

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());
app.use(express.json());

app.get('/', async (req, res)=> {
    let users = await listUsers();
    const email = localStorage.getItem("email");
    if (email) {
        res.render('index',{ users: users })
    } else {
        res.redirect('/login');
    }
    
});

app.get('/register', (req, res) => {
    
    res.render("register");
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
    if (auth) {
        localStorage.setItem("email", email);
        res.redirect('/')
    } else {
        res.render('login');
    }
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
    localStorage.clear();
    res.redirect('/login');
});

app.listen(3000, () => console.log(`Listening on the port 3000!`));
