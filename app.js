// Cargar los módulos
const express = require('express');
const app = express();


// Importado las rutas
const rutas = require('./rutas')

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set(express.static('public'));
app.use(rutas);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})