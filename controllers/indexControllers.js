const connection = require("../config/db");

class IndexControllers{

     

     // Muestra la vista de todos los usuarios/motos   

     verTodosLosUsuarios = (req, res) => {
      let sql = `SELECT * FROM user`;
      let sql2 = `SELECT * FROM object`;
      connection.query(sql, (error1, resultUser) => {
        if (error1) throw error1;
        connection.query(sql2, (error2, resultObject) => {
          if (error2) throw error2;
          res.render("allColeccionistas", { resultUser, resultObject });
        });
      });
    };






}

module.exports = new IndexControllers();