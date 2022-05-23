import React from "react";

export default function EliminarCategoria() {
  const dispatch = useDispatch();
  const categorías = useSelector((state) => state.categorias);
  ([categoria, setCategoria] = useState()),
    useEffect(() => {
      dispatch(getCategorias());
    }, [dispatch]);

  function handleSelectCategorias(e) {
    const seleccionada = e.target.value;
    setCategoria(seleccionada);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(deleteCategoria(categoria));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Eliminar Categoría</div>
        <select
          onChange={(e) => handleSelectCategorias(e)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Elegir categorías
          </option>

          {categorias &&
            categorias
              .filter((categoria) => categoria.nombre)
              .map((d) => (
                <option value={d.id} key={d.id}>
                  {d.nombre}
                </option>
              ))}
        </select>
        <button type="submit">Borrar</button>
      </form>
    </div>
  );
}
