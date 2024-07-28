const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const routerProducto = require('./router/productoRouter');
app.use("/", routerProducto);




// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('Server navega en el puerto 3000');
});