const { Router } = require("express");
const { mercadopago } = require("mercadopago");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productosDB = require("../../assets/products.json");
const usuariosDB = require("../../assets/users.json");
const { Producto, Categoria, Usuario, Rating, Pedido } = require("../db");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//!GET Productos con modelo categoría incluido

router.get("/", async (req, res) => {
  const productos = await Producto.findAll({
    include: [{ model: Categoria }],
  });

  res.send(productos);

  // console.log(productos);

  // if (productos.length === 0) {
  //   const productoJSON = await Producto.bulkCreate(productosDB);
  //   res.send(productoJSON);
  // } else {
  // res.send("Ya hay datos pa");
  // }
});

//!GET Productos con búsqueda en el query

router.get("/productos", async (req, res) => {
  // para que busque tiene que llegar "/productos?name=(loquetraeelbuscador)"
  const productos = await Producto.findAll({
    include: [{ model: Categoria }],
  });

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

//!GET stock de todos los productos

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

//! Ruta para detectar stocks menores a la cifra que se indique en params

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

//! GET producto por ID

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

//! GET todas las categorías

router.get("/categorias", async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      include: [{ model: Producto }],
    });
    res.status(200).send(categorias);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET todos los ratings

router.get("/ratings", async (req, res) => {
  try {
    const rating = await Rating.findAll();
    res.status(200).send(rating);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET todos los ratings de un producto

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

//! GET todos los pedidos

router.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();

    res.status(200).send(pedidos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET todos los pedidos de un usuario

router.get("/pedidos/usuario/:id", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { usuarioId: req.params.id },
    });

    res.status(200).send(pedidos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET a un pedido por id

router.get("/producto/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findByPk(id);

    res.status(200).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET Usuario con id

router.get("/usuario/:id", async (req, res) => {
  const idUsuario = req.params.id;

  try {
    const usuario = await Usuario.findByPk(idUsuario);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET todos los usuarios

router.get("/usuarios", async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.status(200).send(usuario);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//! GET wishlist de un usuario

router.get("/favoritos/wishlist/:id", async (req, res) => {
  try {
    const favoritos = await Producto.findAll({
      include: {
        model: Usuario,
        where: { id: req.params.id },
      },
    });

    res.status(200).send(favoritos);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//? POST crear categorias

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

//? POST crear review de algún producto en particular

router.post("/ratings/crear/:productoid", async (req, res) => {
  console.log(req.body);
  try {
    const { puntaje, comentario, titulo } = req.body;
    const rating = await Rating.create({
      puntaje: puntaje,
      comentario: comentario,
      titulo: titulo,
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

//? POST crear usuario

router.post("/crear", async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      direccion,
      contraseña,
      telefono,
      mail,
      isAdmin,
    } = req.body;
    const usuario = await Usuario.create({
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      direccion: direccion,
      contraseña: contraseña,
      telefono: telefono,
      mail: mail,
      isAdmin: isAdmin,
    });
    res.status(200).send(usuario);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//? POST crear pedido

router.post("/pedido/crear/:idUsuario", async (req, res) => {
  try {
    const idUser = req.params.idUsuario;
    const {
      fecha,
      pago_total,
      tipo_de_pago,
      tipo_de_envio,
      direccion_de_envio,
      estado,
      idProductos, //tiene que llegar un array ocn los ids de los productos
    } = req.body;
    const pedido = await Pedido.create({
      fecha: fecha,
      pago_total: pago_total,
      Tipo_de_pago: tipo_de_pago,
      Tipo_de_envio: tipo_de_envio,
      Direccion_de_envio: direccion_de_envio,
      Estado: estado,
    });

    await idProductos.map((p) => {
      Pedido.findByPk(pedido.id).then((onePedido) => {
        Producto.findByPk(p)
          .then((newProducto) => {
            onePedido.addProducto(newProducto);
          })
          .catch((error) => {
            console.log(error);
            return res.status(400).json(error);
          });
      });
    });
    pedido.usuarioId = idUser;
    res.status(200).send(pedido);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//? POST Relacionar usuarioid con productos favoritos

router.post("/favoritos/wishlist", async (req, res) => {
  const { idProducto, idUsuario } = req.body;

  Usuario.findByPk(idUsuario).then((oneUsuario) => {
    Producto.findByPk(idProducto)
      .then((newProducto) => {
        oneUsuario.addProducto(newProducto);

        return res.status(200).send({ msg: "Favorito relacionado" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json(error);
      });
  });
});

//? POST cargar productos en la base de datos

router.post("/admin/crearorigen", async (req, res) => {
  const producto = await Producto.bulkCreate(productosDB);

  res.status(200).send(producto);
});

//? POST cargar usuarios en la base de datos

router.post("/admin/crearusuarios", async (req, res) => {
  const producto = await Usuario.bulkCreate(usuariosDB);

  res.status(200).send(producto);
});

//? POST crear PRODUCTO

router.post("/admin/crear", async (req, res) => {
  const categoriasAux = await Categoria.findAll({
    include: [{ model: Producto }],
  });

  try {
    const { nombre, descripcion, precio, stock, imagen, categorias } = req.body;
    const producto = await Producto.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: imagen,
    });

    let auxiliar = [];

    categoriasAux?.forEach((elemento) => {
      const filtroId = categorias.filter((c) => c.nombre === elemento);
      auxiliar.push(filtroId[0].id);
    });

    auxiliar?.map((id) => {
      Categoria.findByPk(id).then((esaCategoria) => {
        Producto.findByPk(producto.id) //aca va el id del producto creado
          .then((productoNuevo) => {
            esaCategoria.addProducto(productoNuevo);
          })
          .catch((error) => {
            return res.status(400).json(error);
          });
      });
    });
    res.status(200).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

//? POST Relacionar categorías con productos específicos

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

//? POST Relacionar las categorías iniciales con los productos principales
//! Solo para cuando recargar la base de datos

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

//* PUT Producto

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

    res.status(200).send(id);
  } catch (error) {
    res.status(400).send(error);
  }
});

//* PUT  Corrección de categorías
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

// PUT Pedido para poder cambiar el estado

router.put("/admin/pedido/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = await Pedido.findByPk(id);
    const {
      pago_total,
      tipo_de_pago,
      tipo_de_envio,
      direccion_de_envio,
      estado,
    } = req.body;

    if (pago_total) {
      pedido.pago_total = pago_total;
      pedido.save();
    }
    if (tipo_de_pago) {
      pedido.Tipo_de_pago = tipo_de_pago;
      pedido.save();
    }
    if (tipo_de_envio) {
      pedido.Tipo_de_envio = tipo_de_envio;
      pedido.save();
    }
    if (direccion_de_envio) {
      pedido.Direccion_de_envio = direccion_de_envio;
      pedido.save();
    }
    if (estado) {
      pedido.Estado = estado;
      pedido.save();
    }
    res.status(200).send(id);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PUT Usuario para poder cambiar el estado

router.put("/admin/usuario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = await Pedido.findByPk(id);
    const {
      nombre,
      apellido,
      dni,
      direccion,
      contraseña,
      telefono,
      mail,
      isAdmin,
    } = req.body;

    if (nombre) {
      pedido.nombre = nombre;
      pedido.save();
    }
    if (apellido) {
      pedido.apellido = apellido;
      pedido.save();
    }
    if (dni) {
      pedido.dni = dni;
      pedido.save();
    }
    if (direccion) {
      pedido.direccion = direccion;
      pedido.save();
    }
    if (contraseña) {
      pedido.contraseña = contraseña;
      pedido.save();
    }
    if (telefono) {
      pedido.telefono = telefono;
      pedido.save();
    }
    if (mail) {
      pedido.mail = mail;
      pedido.save();
    }
    if (isAdmin) {
      pedido.isAdmin = isAdmin;
      pedido.save();
    }
    res.status(200).send(id);
  } catch (error) {
    res.status(400).send(error);
  }
});

//+ DELETE producto con id

router.delete("/producto/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const productoABorrar = await Producto.findByPk(id);
    await productoABorrar.destroy();
    res.json(id);
  } catch (error) {
    next(error);
  }
});

//+ DELETE categorias con id

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
//+ DELETE pedido con id

router.delete("/pedido/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const pedidoABorrar = await Pedido.findByPk(id);
    await pedidoABorrar.destroy();
    res.status(200).send(id);
  } catch (error) {
    next(error);
  }
});
//+ DELETE usuario con id

router.delete("/usuario/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuarioaborrar = await Usuario.findByPk(id);
    await usuarioaborrar.destroy();
    res.status(200).send(id);
  } catch (error) {
    next(error);
  }
});

//+ DELETE Relación favoritos usuario

router.delete("/favoritos/wishlist", async (req, res) => {
  const { idUsuario, idProducto } = req.body;

  Usuario.findByPk(idUsuario).then((oneUsuario) => {
    Producto.findByPk(idProducto)
      .then((newProducto) => {
        oneUsuario.removeProducto(newProducto);

        return res.json({ msg: "Favorito fuera de la lista" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json(error);
      });
  });
});

//+ DELETE categoría producto

router.delete("/categorias/producto", async (req, res) => {
  const { idCategoria, idProducto } = req.body;

  Categoria.findByPk(idCategoria).then((oneCategoria) => {
    Producto.findByPk(idProducto)
      .then((newProducto) => {
        oneCategoria.removeProducto(newProducto);

        return res.json({ msg: "Producto fuera de la categoria" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json(error);
      });
  });
});

router.post("/pagar", (req, res) => {
  const { items, payer } = req.body;

  const preference = {
    items: items?.map((item) => item),

    payer: {
      name: payer.name,
      surname: payer.surname,
      email: payer.email,
    },
  };

  mercadopago.preferences
    .create(preference)
    .then((r) => res.json(r.body.id))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
