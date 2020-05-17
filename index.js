const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

/**CONEXION A DB */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

/**MODELO */
const Libro = sequelize.define("libro", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  autor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  editorial:{
    type: Sequelize.STRING,
    allowNull: false
  },
  fecha: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

sequelize.sync();

/** SE INICIALIZA LA APP */
const app = express();

/**MIDDLEWARES */
app.use(bodyParser.json());

/**RUTAS */
app.get("/libros", async (req, res) => {
  const todoslibros = await Libro.findAll();
  res.json(todoslibros);
});

app.get("/libros/:id", async (req, res) => {
  const id = req.params.id;
  const unLibro = await Libro.findAll({
    where: {
      id: id
    }
  });
  res.json(unLibro);
});

app.post("/libros", async (req, res) => {
  const { titulo, autor, editorial, fecha } = req.body;
  const nuevoLibro = await Libro.create({titulo, autor, editorial, fecha });
  res.json(nuevoLibro);
});


// TODO: EL PUT y EL DELETE

app.put("/libros/modificar/:id", async (req, res) => {
  const { id } = req.params; //el id esta en la url, lo guardamos en una constante con el mismo nombre
  const { titulo, autor, editorial, fecha } = req.body; //el nombre y el apellido van a salir del json, es decir esta en req.body
  const libroModificado = await Libro.update(
    { titulo, autor, editorial, fecha  },
    { where: { id: id } }
  ); // cambiamos al usuario donde el id coincida con el id de params.
  // es lo mismo escribir const id = req.params.id y const {id} = req.params
  res.json(libroModificado); //respondemos con un json que tiene el usuario modificado
});


app.delete("/libros/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  await Libro.destroy({ where: { id } }); // es lo mismo poner {id: id} a {id}
  res.json({ mensaje: "Libro Eliminado" });
}); 
/**APP ESCUCHA PUERTO */
app.listen(3456, () => console.log("http://localhost:3456/libros"));
