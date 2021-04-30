const express = require('express');
const app =  express();

app.get('/', (req, res) =>{
    let html = '';

    for (let i = 1; i <= 50; i++) {
        let print = '';
        print = i % 2 === 0
            ? 'Soy Par!'
            : 'Soy Impar!';

        html += `<p>${i} ${print}</p>`;        
    }

    res.send(html);
});

app.listen(3000, () => console.log('Listening on port 3000!'));