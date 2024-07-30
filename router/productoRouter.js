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

module.exports = router;