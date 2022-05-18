const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req, res) => {
  res.send("arranca o no arranca?");
});

module.exports = router;

router.get("/productos", async (req, res) => {
  const productos = await Producto.findAll();
  const { name } = req.query;

  if (name) {
    try {
      res
        .status(200)
        .send(productos.filter((producto) => producto.name.contains(name)));
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      res.status(200).send(productos);
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

roter.get("/producto/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    res.status(200).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/categorias", async (req, res) => {
  try {
    const categorias = await Categorias.findAll();
    res.status(200).send(categorias);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/categorias/:nombre", async (req, res) => {
  const nombreCategoria = req.params;
  try {
    const productos = await Productos.findAll({
      where: {
        categorias: categoriaas.filter(
          (categoria) => categoria.name === nombreCategoria
        ),
      },
    });
    res.status(200).send(productos);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/usuario/:id", async (req, res) => {
  const idUsuario = req.params;
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/adim/crear", async (req, res) => {
  try {
    const { id, nombre, apellido, dni, direccion, contraseña, telefono, mail } =
      req.body;
    const usuario = await Usuario.create({
      id: id,
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      direccion: direccion,
      contraseña: contraseña,
      telefono: telefono,
      mail: mail,
    });
    res.status(200).send(console.log(usuario));
  } catch (error) {
    res.status(200).send(error);
  }
});
