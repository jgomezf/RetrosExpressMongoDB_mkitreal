const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views','views')
app.use(express.urlencoded());

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const nombre = req.body.nombre;
    if (!nombre || nombre === undefined) {
        nombre = 'desconocido'
    }
     res.send(`<h1>Hola ${nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}!</h1>`)
})
app.listen(3000, () => console.log(`Servidor iniciado en el puerto 3000`));