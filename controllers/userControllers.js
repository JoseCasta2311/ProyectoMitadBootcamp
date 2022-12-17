const connection = require("../config/db");
const bcrypt = require("bcrypt");

class UserControllers{

      //   Registro usuario
      registrarUsuario = (req, res) => {
    res.render("registerUser", { mensaje: "" });
  };

    // Crea un nuevo usuario
    guardarUsuario = (req, res) => {
        let { name, last_name, phone_number, email, password } = req.body;
    
        
    
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;

         let sql = `INSERT INTO user (name, last_name, phone_number, email, password) VALUES ("${name}", "${last_name}", ${phone_number}, "${email}", "${hash}")`;

          if (req.file != undefined) {
            let img = req.file.filename;
             sql = `INSERT INTO user (name, last_name, phone_number, email, password, img) VALUES ("${name}", "${last_name}", ${phone_number}, "${email}", "${hash}", "${img}")`;
          }

          
    
          connection.query(sql, (error, result) => {
            if (error) {
              if (error.code == "ER_DUP_ENTRY") {
                res.render("registerUser", { mensaje: "El email ya existe" });
              } else {
                throw error;
              }
            } else {
              console.log(result);
              res.redirect("/user/login");
            }
          });
        });
      };


        //   Muestra el formulario de login
            verFormularioLogin = (req, res) => {
                res.render("login", { mensaje: "" });
            };


   //   Recoge los datos del formulario de login
   logearte = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}'`;
    connection.query(sql, (error, resultEmail) => {
      if (error) throw error;
      console.log("resultEmail", resultEmail);
      if (resultEmail.length == 1) {
        let pass = resultEmail[0].password;
        bcrypt.compare(password, pass, (err, result) => {
          if (err) throw err;
          if (result) {
            let user_id = resultEmail[0].user_id;
            res.redirect(`/user/oneUser/${user_id}`);
          } else {
            res.render("login", { mensaje: "Credenciales Incorrectas" });
          }
        });
      } else {
        res.render("login", { mensaje: "Credenciales Incorrectas" });
      }
    });
  };


  // Muestra la vista de un usuario y objetos(motos) con 2 consultas 

  verUnUsuario = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM user WHERE user_id = ${id}`;
    let sql2 = `SELECT * FROM object WHERE user_id = ${id}`;

    connection.query(sql, (error1, resultUser) => {
      if (error1) throw error1;
      connection.query(sql2, (error2, resultObject) => {
        if (error2) throw error2;
        res.render("oneUser", { resultUser, resultObject });
      });
    });
  };


// Eliminar usuarios/coleccionistas

deleteUsuario = (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM user WHERE user_id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("/");
  });
}


//Editar Entrenador
editColeccionista = (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user WHERE user_id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.render("editUser", { result });
  });
};


//Editar coleccionista

editar = (req, res) => {
  let id = req.params.id;
  let { name, last_name, phone_number, hobby, description} = req.body;

  let sql = `UPDATE user SET name = '${name}', last_name = '${last_name}', phone_number = '${phone_number}', hobby = '${hobby}', description = '${description}' WHERE user_id = ${id}`;

  if (req.file != undefined) {
    let img = req.file.filename;
    sql = `UPDATE user SET name = '${name}', last_name = '${last_name}', phone_number = '${phone_number}', hobby = '${hobby}', description = '${description}', img = '${img}' WHERE user_id = ${id}`;
  }
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect(`/user/oneUser/${id}`);
  });
};



}

module.exports = new UserControllers();