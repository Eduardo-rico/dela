const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

/**CONEXION A DB */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});
/**MODELO */
const Usuario = sequelize.define("usuario", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellido: {
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
app.get("/usuarios", async (req, res) => {
  const todosUsuarios = await Usuario.findAll();
  res.json(todosUsuarios);
});
app.get("/usuarios/:id", async (req, res) => {
  const id = req.params.id;
  const unUsuario = await Usuario.findAll({
    where: {
      id: id
    }
  });
  res.json(unUsuario);
});
app.post("/usuarios", async (req, res) => {
  const { nombre, apellido } = req.body;
  const nuevoUsuario = await Usuario.create({ nombre, apellido });
  res.json(nuevoUsuario);
});

//TODO: EL PUT y EL DELETE

app.put("/usuarios/modificar/:id", (req, res) => {
  res.json("TODO");
});

app.delete("/usuarios/eliminar/:id", (req, res) => {
  res.json("TODO");
});

/**APP ESCUCHA PUERTO */
app.listen(3456, () => console.log("http://localhost:3456/usuarios"));
