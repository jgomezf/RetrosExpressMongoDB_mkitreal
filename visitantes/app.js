const express = require('express');
const {insertVisitor, findVisitor, updateCountVisitor, listVisitors} = require('./visitor')
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', async (req, res) => {
    let name = req.query.name;
    let rows = '';

    name = !name || name === undefined
            ? 'Anónimo'
            : name;

    if (name === 'Anónimo') {
        await insertVisitor(name);
    } else {
        const found = await findVisitor(name);

        found.length > 0 ? await updateCountVisitor(found) : await insertVisitor(name);
    }

    let visitors = await listVisitors();
    
    res.render("index", { visitors: visitors })
});

app.listen(3000, () => console.log(`Listening on the port 3000!`));