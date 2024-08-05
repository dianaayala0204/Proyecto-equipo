const router = require("express").Router();
const productoController = require("../controller/productosController");
const multer = require('multer');

/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/imagenes');
    },
    filename: (req, file) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer ({storage});
//*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/imagenes');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage }); // Se ve bien, debería funcionar


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/promociones', (req, res) => {
    res.render('promociones');
});

/** Se modificaron las routes
 * router get se quita el res.render porque la vista /producto necesita una lista de productos
 * se cambia la route raiz / porque debe direccionar a home
 * se comentan las siguiente lineas de código porque router get producto está incompleto.
 */

// router.get('/producto', (req, res) => {
//      res.render('producto', { productos });
// });

/** Se cambio la route / porque ya existe
 * Se muestra a traves de productoController método list
 * Este es el render completo con la lista de productos, extraída de productos.json
 */
router.get("/producto", productoController.list);

router.get("/create", productoController.create);

router.post("/create", upload.single('imagen'), productoController.stock);



// Traer los datos del servidor al navegador 
router.get("/:id/edit", productoController.edit);
// Lleva los datos del navegador al sevidor
router.put("/:id", upload.single('imagen'), productoController.update);

router.get("/:id/delete", productoController.delete);
// router.get("/eliminar:id", productoController.delete);
router.delete("/:id", productoController.destroy);

/** Añadir router tipo get productos nuevos para iframe productos nuevos. 
router.get("/productos-nuevos", productoController.productos_nuevos);
*/
/** Añadir router tipo get promociones para promociones 
router.get("/promociones", productoController.promociones);
*/

module.exports = router;