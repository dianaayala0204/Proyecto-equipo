const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController = {
    list: (req, res) =>{
        res.render('producto', {productos});
    },
    
    create: (req, res) =>{
        res.render('productos/creacionProd');
    },

    stock: (req, res) => {
        const marca = req.body.marca;
        const descripcion = req.body.descripcion;
        const precio = req.body.precio;

        const nuevoProducto = {
            id: productos.length + 1,
            marca:marca,
            descripcion:descripcion,
            precio:precio
        };
        
        try{
            productos.push(nuevoProducto);
            fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
            res.redirect('/');
            }
            catch(error){
                console.log("Error al guardar el producto");
                console.error(error)
                res.status(500).send("Error al guardar el producto en el servidor")
            }
    },

}

module.exports = productosController;
