const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const router = require(''); // Assurez-vous d'importer correctement votre fichier de routeur
const app = express();
const port = 5000;
const path = require('path');

app.engine('hbs', engine);

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/images', express.static(path.join(__dirname, 'assets/images')));

// Montez les routes définies dans votre objet de routeur sur le chemin racine
app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening at: https://127.0.0.1:${port}`);
});