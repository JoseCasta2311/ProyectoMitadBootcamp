const connection = require("../config/db");

class ObjectControllers{

    //  Muestra el formulario para crear motos

    verFormularioMoto = (req, res) => {
      let id = req.params.id;
        res.render("crearMoto", { id });
      };

//   Añade una nueva moto

addMoto = (req, res) => {
  let { name, description, price, id} = req.body;
  
  let sql = `INSERT INTO object (name, description, price,  user_id) VALUES ('${name}', '${description}', '${price}', ${id}) `;
  if (req.file != undefined) {
    let img = req.file.filename;
    sql = `INSERT INTO object (name, description, price, user_id, img) VALUES ('${name}', '${description}', '${price}', ${id}, '${img}') `;
  }
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect(`/user/oneUser/${id}`);
  });
};
    

//Muestra el formulario en el navbar para crear motos

navCreateMoto = (req, res) => {
  let sql = `SELECT user_id, name FROM user`;
  connection.query(sql, (error, resultUser) => {
    if (error) throw error;
    res.render("navCreateMoto", { resultUser });
  });
};


//  Borrado real moto
deleteMoto = (req, res) => {
  let { object_id, user_id } = req.params;

  let sql = `DELETE FROM object WHERE object_id = ${object_id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect(`/user/oneUser/${user_id}`);
  });
};

    
 // Muestra el formulario de editar una moto
 editMoto = (req, res) => {
  let object_id = req.params.object_id;
  let sql = `SELECT * FROM object WHERE object_id = ${object_id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.render("editMoto", { result });
  });
};



 // Edita una mascota

 editMotos = (req, res) => {
  let { user_id, object_id } = req.params;
  let { name, description, price } = req.body;

  let sql = `UPDATE object SET name = '${name}', description ='${description}', price ='${price}' WHERE object_id = ${object_id}`;

  if (req.file != undefined) {
    let img = req.file.filename;
    sql = `UPDATE object SET name = '${name}', description ='${description}', img = '${img}', price = '${price}' WHERE object_id = ${object_id}`;
  }

  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect(`/user/oneUser/${user_id}`);
  });
};





};




module.exports = new ObjectControllers();