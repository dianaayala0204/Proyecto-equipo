const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController = {
    list: (req, res) => {
        res.render('producto', { productos });
    },

    create: (req, res) => {
        res.render('productos/creacionProd');
    },

    stock: (req, res) => {
        const marca = req.body.marca;
        const descripcion = req.body.descripcion;
        const precio = req.body.precio;
        const imagen = req.file ? req.file.filename : null;


        const nuevoProducto = {
            id: productos.length + 1,
            marca: marca,
            descripcion: descripcion,
            precio: precio,
            imagen: imagen
        };
        try {
            productos.push(nuevoProducto);
            fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
            res.redirect('/');
        }
        catch (error) {
            console.log("Error al guardar el producto");
            console.error(error)
            res.status(500).send("Error al guardar el producto en el servidor")
        }

    },



    edit: (req, res) => {
        const id = req.params.id;
        const producto = productos.find(producto => producto.id == id);
        res.render('productos/editarProd', { producto });
    },

    update: (req, res) => {
        const id = req.params.id;
        const marca = req.body.marca;
        const descripcion = req.body.descripcion;
        const precio = req.body.precio;
        const imagen = req.file ? req.file.filename : null;

        const productoUpdate = productos.findIndex(producto => producto.id == id);
        if (productoUpdate !== -1) {
            productos[productoUpdate] = { id: Number(id), marca, descripcion, precio, imagen };
            try {
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
                res.redirect('/');
            }
            catch (error) {
                console.log("Error al guardar el producto");
                console.error(error)
                res.status(500).send("Error al guardar el producto en el servidor")
            }
        } else {
            res.status(404).send("Producto no encontrado");
        }
    },

    delete: (req, res) => {
        const id = req.params.id;
        const producto = productos.find(producto => producto.id == id);
        res.render('productos/eliminarProd', { producto });
        if (producto) {
            res.render('productos/eliminarProd', { producto });
        }
        // Reordené este código con alt shift f
        else {
            res.status(404).send("Producto no encontrado");
        }
    },


    destroy: (req, res) => {
        const id = req.params.id;
        const productoEliminar = productos.findIndex(producto => producto.id == id);
        if (productoEliminar !== -1) {
            productos.splice(productoEliminar, 1);
            try {
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
                res.redirect('/');
            }
            catch (error) {
                console.log("Error al guardar el producto");
                console.error(error)
                res.status(500).send("Error al guardar el producto en el servidor")
            }
        } else {
            res.status(404).send("Producto no encontrado");
        }
    },

    /** Añadido render productos-nuevos para mostrar iframe productos nuevos en productos.ejs */
    productos_nuevos: (req, res) => {
        res.render('productos-nuevos');
    },

    /** Añadido render promociones para mostrar página promociones */
    promociones: (req, res) => {
        res.render("promociones");
    },
}





module.exports = productosController;
