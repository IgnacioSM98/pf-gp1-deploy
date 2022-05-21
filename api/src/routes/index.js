const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const productosDB = require("../../assets/products.json");
const { Producto, Categoria, Usuario, Rating } = require("../db");

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
router.get("/stock", async (req, res) => {
  try {
    const productos = await Producto.findAll();
    let result;
    if (productos.length) {
      result = productos.map((e) => {
        return { id: e.id, nombre: e.nombre, stock: e.stock };
      });
    }
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Ruta para detectar stocks menores a la cifra que se indique en params
router.get("/stock/:alerta", async (req, res) => {
  const alerta = req.params.alerta;
  try {
    const productos = await Producto.findAll();
    let result;
    if (productos.length) {
      result = productos.map((e) => {
        return { id: e.id, nombre: e.nombre, stock: e.stock };
      });
    }
    if (alerta.length) {
      const filtrado = result.filter((e) => e.stock <= alerta);
      return res.send(filtrado);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/producto/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id, {
      include: [{ model: Categoria }],
    });

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
  try {
    const rating = await Rating.findAll({
      where: { productoId: req.params.productoid },
    });
    res.status(200).send(rating);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/categorias/crear", async (req, res) => {
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

router.post("/ratings/crear/:productoid", async (req, res) => {
  try {
    const { puntaje, comentario } = req.body;
    const rating = await Rating.create({
      puntaje: puntaje,
      comentario: comentario,
    });
    rating.productoId = req.params.productoid;
    rating.save();

    res.status(200).send(rating);
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
  const idUsuario = req.params.id;

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

router.post("/admin/crearorigen", async (req, res) => {
  const producto = await Producto.bulkCreate(productosDB);

  res.status(200).send(producto);
});

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

    auxiliar.map((id) => {
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
    const id = req.params.id;
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
    if (stock) {
      producto.stock = stock;
      producto.save();
    }
    res.status(200).send({ msg: "cambios guardados!" });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/categorias/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Categoria.findByPk(id);
    const { nombre } = req.body;
    if (nombre) {
      producto.nombre = nombre;
      producto.save();
    }
    res.status(200).send({ msg: "cambios guardados!" });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/categorias/producto", async (req, res) => {
  const { idProducto, idCategoria } = req.body;

  Categoria.findByPk(idCategoria).then((oneCategoria) => {
    Producto.findByPk(idProducto)
      .then((newProducto) => {
        oneCategoria.addProducto(newProducto);

        return res.json({ msg: "Listo" });
      })
      .catch((error) => {
        return res.status(400).json(console.log(error));
      });
  });
});

router.post("/categorias/producto/all", async (req, res) => {
  let { idProducto, idCategoria } = req.body;
  idProducto.map((p) => {
    Categoria.findByPk(idCategoria).then((oneCategoria) => {
      Producto.findByPk(p)
        .then((newProducto) => {
          oneCategoria.addProducto(newProducto);
        })
        .catch((error) => {
          return res.status(400).json(console.log(error));
        });
    });
  });
  return res.json({ msg: "Listo" });
});

//Deletes varios

router.delete("/producto/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const productoABorrar = await Producto.findByPk(id);
    await productoABorrar.destroy();
    res.json({ msg: "borrado" });
  } catch (error) {
    next(error);
  }
});
router.delete("/categorias/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const catABorrar = await Categoria.findByPk(id);
    await catABorrar.destroy();
    res.json({ msg: "borrado" });
  } catch (error) {
    next(error);
  }
});
router.delete("/ratings/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const ratingABorrar = await Rating.findByPk(id);
    await ratingABorrar.destroy();
    res.json({ msg: "borrado" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
