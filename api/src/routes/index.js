const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const productosDB = require("../../assets/products.json");
const { Producto, Categoria, Usuario } = require("../db");
const Rating = require("../models/Rating");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const productos = await Producto.findAll();

  res.send(productos);

  // console.log(productos);

  // if (productos.length === 0) {
  //   const productoJSON = await Producto.bulkCreate(productosDB);
  //   res.send(productoJSON);
  // } else {
  // res.send("Ya hay datos pa");
  // }
});

router.get("/productos", async (req, res) => {
  // para que busque tiene que llegar "/productos?name=(loquetraeelbuscador)"
  const productos = await Producto.findAll();

  let { name } = req.query;

  // console.log(name, "esto aparece");
  // console.log(productos[0].nombre, "y esto?");

  if (name) {
    try {
      res
        .status(200)
        .send(
          productos.filter((p) =>
            p.nombre.toLowerCase().includes(name.toLowerCase())
          )
        );
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
router.get("/productos", async (req, res) => {
  const productos = await Producto.findAll();

  let { name } = req.query;

  // name = name.toLowerCase();

  // console.log(name, "esto aparece");
  // console.log(productos[0].nombre, "y esto?");

  if (name) {
    try {
      res
        .status(200)
        .send(
          productos.filter((p) =>
            p.nombre.toLowerCase().includes(name.toLowerCase())
          )
        );
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
    const producto = await Producto.findByPk(id);

    res.status(200).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/categorias", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).send(categorias);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/ratings", async (req, res) => {
  try {
    const rating = await Rating.findAll();
    res.status(200).send(rating);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/ratings/:productoid", async (req, res) => {
  const { productoId } = req.params;

  try {
    const rating = await Rating.findAll({ where: { productoId: productoId } });
    res.status(200).send(rating);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("categorias/crear", async (req, res) => {
  try {
    const { nombre } = req.body;
    const categoria = await Categoria.create({
      nombre: nombre,
    });
    res.status(200).send(categoria);
  } catch (error) {
    res.status(200).send(error);
  }
});

router.post("ratings/crear", async (req, res) => {
  try {
    const { puntaje, comentario, productoid } = req.body;
    const rating = await Categoria.create({
      puntaje: puntaje,
      comentario: comentario,
      productoid: productoid,
    });
    res.status(200).send(rating);
  } catch (error) {
    res.status(200).send(error);
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

<<<<<<< HEAD
// router.post("/admin/crearorigen", async (req, res) => {
//   const producto = await Producto.bulkCreate(productosDB);
//   console.log(productosDB, "que onda esto");
//   res.status(200).send(producto);
// });
=======
router.post("/admin/crearorigen", async (req, res) => {
  const producto = await Producto.bulkCreate(productosDB);
  console.log(productosDB, "que onda esto");

  res.status(200).send(producto);
});
>>>>>>> 8c3c1e9884ed8b79dbd6ebeaad30592489036c95

router.post("/admin/crear", async (req, res) => {
  const categorias = await Categoria.findAll({
    include: [{ model: Producto }],
  });

  try {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const producto = await Producto.create({
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
      Categoria.findByPk(id).then((esaCategoria) => {
        Producto.findByPk(producto.id) //aca va el id del producto creado
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

router.put("/admin/:id", async (req, res) => {
  try {
    const id = req.params;
    const producto = await Producto.findByPk(id);
    const { nombre, precio, descripcion, imagen, stock } = req.body;
    if (nombre) {
      producto.nombre = nombre;
      producto.save();
    }
    if (precio) {
      producto.precio = precio;
      producto.save();
    }
    if (descripcion) {
      producto.descripcion = descripcion;
      producto.save();
    }
    if (imagen) {
      producto.imagen = imagen;
      producto.save();
    }
    if (nombre) {
      producto.stock = stock;
      producto.save();
    }
    res.status(200).send({ msg: "cambios guardados!" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
