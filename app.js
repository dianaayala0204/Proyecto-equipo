const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/imagenes');
    },
    filename: (req, file,cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer ({ storage });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

const routerProducto = require('./router/productoRouter');
// const multer = require('multer');
app.use("/", routerProducto);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('Server navega en el puerto 3000');
});