var express = require('express');
var router = express.Router();
const userController = require("../controllers/userControllers");
const uploadImage = require("../middleware/uploadImage");


//Ruta base: localhost:3000/user


//localhost:3000/user/register
router.get("/register", userController.registrarUsuario);

//localhost:3000/user/register
router.post("/register", uploadImage("users"), userController.guardarUsuario);


//localhost:3000/user/login
router.get("/login", userController.verFormularioLogin);

// localhost:3000/user/login
router.post("/login", userController.logearte);

//localhost:3000/user/oneUser/:id
router.get("/oneUser/:id", userController.verUnUsuario);


// localhost:3000/user/delete/:id
router.get("/delete/:id", userController.deleteUsuario);


// localhost:3000/user/editColeccionista/:id
router.get("/editColeccionista/:id", userController.editColeccionista);

// localhost:3000/user/editColeccionista/:id   /user/editColeccionista/<%= user[0].user_id %>
router.post("/editColeccionista/:id", uploadImage("users"), userController.editar);


module.exports = router;
