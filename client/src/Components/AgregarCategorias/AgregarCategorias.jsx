import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from "styled-components";
import validate from "../CrearProducto/validaciones";

const Container = s.div`
    display: flex;
    flex-direction: inherit;
    justify-content: end;
     width: 100%;
     height: 100%;
    // margin: 0px 4px;
    border-radius: 7px 7px 7px 7px;
    border: none;
    background-color: lightgrey;
    height: 150px;
`;

const Button = s.button`
    margin: 0px 4px 10px 4px;
    padding: 4px;
    border-radius: 5px 5px 5px 5px;
    border-width: 0;
    background-color: #ffffffc4;
    font-size: 12px;
`;

const Select = s.select`
    // width: 310px;
    margin: 2px 4px;
    border-radius: 3px 3px 3px 3px;
    border-width: 0;
`;

const Option = s.option`
    // width: 310px;
     margin: 2px 2px;
     padding: 0px 4px;
    //  border-radius: 5px 5px 5px 5px;
    // border-width: 0;
`;

export default function AgregarCategorias({
  setPost,
  post,
  setErrors,
  detalle,
  creado,
}) {
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(() => {
    if (detalle.categoria) setSelectedValue(detalle.categoria);
  }, [detalle]);

  useEffect(() => {
    setPost({ ...post, probando: true });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (creado) setSelectedValue([]);
  }, [creado]);

  var categorias = useSelector((state) => state.categorias);

  useEffect(() => {
    //supuestameente esto no funca
    // eslint-disable-next-line
    categorias = categorias.sort(function (a, b) {
      var x = a.nombre.toLowerCase();
      var y = b.nombre.toLowerCase();

      return x < y ? -1 : x > y ? 1 : 0;
    });
  }, [categorias]);

  // useEffect(() => {
  //   setErrors(validate({ ...post, categorias: selectedValue }));
  //   // eslint-disable-next-line
  // }, [selectedValue]);

  const handleChange = ({ target }) => {
    const categoria = categorias?.filter(
      (categoria) => categoria.nombre === target.value
    )[0];

    if (!selectedValue.find((selected) => selected.nombre === target.value)) {
      setSelectedValue((prevValue) => [...prevValue, categoria]);

      setPost({ ...post, categorias: [...selectedValue, categoria] });
    }

    setErrors(validate({ ...post, categorias: selectedValue }));
  };

  const handleDelete = (e) => {
    setSelectedValue(
      selectedValue.filter((selected) => selected.nombre !== e.target.value)
    );

    setPost({
      ...post,
      categorias: [
        ...selectedValue.filter(
          (selected) => selected.nombre !== e.target.value
        ),
      ],
    });
  };

  return (
    <Container>
      {selectedValue ? (
        <div style={{ margin: 1, lineHeight: "25px" }}>
          <div>
            {selectedValue?.map((selected) => (
              <Button
                value={selected.nombre}
                key={selected.id}
                onClick={(e) => handleDelete(e)}
              >
                {selected.nombre} X
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      <Select
        name="select"
        id=""
        multiple="multiple"
        size={6}
        onChange={(e) => handleChange(e)}
      >
        {categorias[0] ? (
          categorias
            .filter((categoria) => categoria.nombre)
            .map((categoria) => (
              <Option
                value={categoria.nombre}
                key={categoria.id}
                disabled={selectedValue?.length > 2 ? true : false}
              >
                {categoria.nombre}
              </Option>
            ))
        ) : (
          <Option>Loading...</Option>
        )}
      </Select>
    </Container>
  );
}
