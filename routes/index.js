var express = require('express');
const indexControllers = require('../controllers/indexControllers');
var router = express.Router();



//Ruta base: localhost:3000

//localhost:3000/
router.get("/", indexControllers.verTodosLosUsuarios);



module.exports = router;
