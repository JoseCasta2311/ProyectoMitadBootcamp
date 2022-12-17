var express = require('express');
var router = express.Router();
const objectControllers = require("../controllers/objectControllers");
const uploadImage = require("../middleware/uploadImage");


//Ruta base localhost:3000/object

// localhost:3000/object/addMoto/:id
router.get("/addMoto/:id", objectControllers.verFormularioMoto);

// localhost:3000/object/addMoto
router.post("/addMoto", uploadImage("objetos"), objectControllers.addMoto);


// localhost:3000/object/navCreateMoto
router.get("/navCreateMoto", objectControllers.navCreateMoto);

// localhost:3000/object/deleteMoto/:object_id/:user_id
router.get("/deleteMoto/:object_id/:user_id", objectControllers.deleteMoto);


// localhost:3000/object/editMoto/:object_id
router.get("/editMoto/:object_id", objectControllers.editMoto);



// localhost:3000/object/editMotos/:object_id/:user_id
router.post(
    "/editMotos/:object_id/:user_id",
    uploadImage("objetos"),
    objectControllers.editMotos
  );




module.exports = router;
