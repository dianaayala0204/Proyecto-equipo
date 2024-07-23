const router = require("express").Router();
const productoController = require("../controller/productosController");

router.get("/", productoController.list);

router.get("/create", productoController.create);
router.post("/create", productoController.stock);


module.exports = router;