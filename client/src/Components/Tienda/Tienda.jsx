import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // getProductos,
  // getCategorias,
  filtrarCategorias,
  ordenarPorNombre,
  ordenarPorPrecio,
} from "../../Redux/actions/index";
import Producto from "../Producto/Producto";
import Paginado from "../Paginado/Paginado";
import { getProductos } from "../../Redux/actions/index";
import "./Tienda.css";

function Shop() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productos);
  const catego = useSelector((state) => state.categorias);
  const [cambio, setCambio] = useState(true);

  useEffect(() => {
    if (product.length === 0) dispatch(getProductos());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 12;
  const ultimoProducto = productosPerPage * currentPage;
  const primerProducto = ultimoProducto - productosPerPage;
  // const currentProductos = product.slice(primerProducto, ultimoProducto);

  const [currentProductos, setCurrentProductos] = useState([]);

  useEffect(() => {
    setCurrentProductos(product.slice(primerProducto, ultimoProducto));
  }, [product, primerProducto, ultimoProducto]);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  function handleFilterByCategories(e) {
    dispatch(filtrarCategorias(e.target.value));
  }

  function handleOrderByName(e) {
    dispatch(ordenarPorNombre(e.target.value));
    cambio ? setCambio(false) : setCambio(true);
  }

  function handleOrderByPrice(e) {
    dispatch(ordenarPorPrecio(e.target.value));
    cambio ? setCambio(false) : setCambio(true);
  }

  function onChangeHandle(e) {
    const value = e.target.value;

    const arrayAux = product.filter((prod) => {
      const name = prod.nombre.toLowerCase();
      const isVisible = name.includes(value.toLowerCase());

      if (isVisible) {
        return prod;
      }
    });

    setCurrentProductos(arrayAux);
  }

  return (
    <div>
      <div>
        <h1 className="h1-tienda">Productos</h1>
      </div>

      <div className="search">
        <form>
          <input
            type="text"
            placeholder="Busca productos"
            onChange={(e) => {
              onChangeHandle(e);
            }}
          />
        </form>
      </div>

      <div className="filtros-tienda">
        <select onChange={(e) => handleOrderByName(e)} defaultValue="default">
          <option value="default" disabled>
            Orden Alfabético
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select onChange={(e) => handleOrderByPrice(e)} defaultValue="default">
          <option value="default" disabled>
            Orden Por Precio
          </option>
          <option value="asc">Higher</option>
          <option value="desc">Lower</option>
        </select>
        <select
          onChange={(e) => handleFilterByCategories(e)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Categorías
          </option>
          {catego &&
            catego.map((d) => (
              <option value={d.name} key={d.id}>
                {d.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <Paginado
          ProdPerPage={productosPerPage}
          totalProd={product?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="productos-tienda">
          {currentProductos &&
            currentProductos.map((el) => {
              return (
                <Producto
                  key={el.id}
                  id={el.id}
                  imagen={el.imagen}
                  nombre={el.nombre}
                  precio={el.precio}
                  descripcion={el.descripcion}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Shop;
