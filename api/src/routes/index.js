const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productosDB = require("../../Assests/productos.json");
const { Productos, Categorias, Usuarios } = require("../db");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req, res) => {
  res.send("arranca o no arranca?");
});

router.get("/productos", async (req, res) => {
  const productos = await productosDB.findAll();
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

router.get("/producto/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Productos.findByPk(id);
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

// router.get("/categorias/:nombre", async (req, res) => {
//   const nombreCategoria = req.params;
//   try {
//     const productos = await Productos.findAll({
//       where: {
//         categorias: categorias.filter(
//           (categoria) => categoria.name === nombreCategoria
//         ),
//       },
//     });
//     res.status(200).send(productos);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.get("/usuario/:id", async (req, res) => {
  const idUsuario = req.params;
  try {
    const usuario = await Usuarios.findByPk(idUsuario);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/crear", async (req, res) => {
  try {
    const { id, nombre, apellido, dni, direccion, contraseña, telefono, mail } =
      req.body;
    const usuario = await Usuarios.create({
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

router.post("/admin/crear", async (req, res) => {
  if (Productos.findAll().length === 0) {
    await Productos.createBulk(productosDB);
  }

  const categorias = await Categorias.findAll({
    include: [{ model: Productos }],
  });

  try {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const producto = await Productos.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: imagen,
    });

    let auxiliar = [];

    categoria.forEach((elemento) => {
      const filtroId = categorias.filter((c) => c.nombre === elemento);
      auxiliar.push(filtroId[0].id);
    });

    auxiliar.map(async (id) => {
      await Categorias.findByPk(id).then((esaCategoria) => {
        Productos.findByPk(producto.id) //aca va el id del producto creado
          .then((productoNuevo) => {
            esaCategoria.addProducto(productoNuevo);
          })
          .catch((error) => {
            return res.status(400).json(console.log(error));
          });
      });
    });
    res.status(200).send(producto);
  } catch (error) {
    res.status(200).send(error);
  }
});

module.exports = router;
