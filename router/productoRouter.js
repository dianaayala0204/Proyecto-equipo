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

router.get('/producto', (req, res) => {
     res.render('producto');
});


router.get("/", productoController.list);

router.get("/create", productoController.create);

router.post("/create", upload.single('imagen'), productoController.stock);

// MODIFICADO DIANA

// Traer los datos del servidor al navegador 
router.get("/:id/edit", productoController.edit);
// Lleva los datos del navegador al sevidor
router.put("/:id", upload.single('imagen'), productoController.update);

router.get("/:id/delete", productoController.delete);
// router.get("/eliminar:id", productoController.delete);
router.delete("/:id", productoController.destroy);

/** Añadir router tipo get productos nuevos para iframe productos nuevos. */
router.get("/productos-nuevos", productoController.productos_nuevos);

/** Añadir router tipo get promociones para promociones */
router.get("/promociones", productoController.promociones);

module.exports = router;