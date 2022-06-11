import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import Cerrar from "../Cerrar";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Ajustes({ setOption }) {
  const user = useSelector((state) => state.userInfo);
  const [userDB, setUserDB] = useState({});
  const [saveButton, setSaveButton] = useState(false);

  useEffect(() => {
    axios
      .get("https://proyecto-final-gp1.herokuapp.com/usuarios")
      .then((resp) => {
        setUserDB(resp.data.filter((usuario) => usuario.id === user.uid)[0]);
      });
  }, [user]);

  const handleChange = (e, name) => {
    setSaveButton(true);
    setUserDB({ ...userDB, [name]: e });
  };

  return (
    userDB && (
      <View>
        <Pressable onPress={() => setOption(false)}>
          <Cerrar />
        </Pressable>

        <View
          style={{
            backgroundColor: "red",
            height: "20%",
            width: "100%",
            display: "flex",
          }}
        >
          <Text>Mi perfil</Text>
          <Text>Actualiza tus datos personales</Text>
          <Image
            style={{ height: 70, width: 70, borderRadius: 50 }}
            source={{ uri: user.photoURL }}
            alt="Profile Picture"
          ></Image>
        </View>

        <TextInput
          value={userDB.nombre}
          onChangeText={(e) => handleChange(e, "nombre")}
          placeholder="Nombres"
        ></TextInput>

        <TextInput
          value={userDB.apellido}
          onChangeText={(e) => handleChange(e, "apellido")}
          placeholder="Apellidos"
        ></TextInput>

        <TextInput
          value={userDB.dni}
          onChangeText={(e) => handleChange(e, "dni")}
          placeholder="DNI"
        ></TextInput>

        <TextInput
          value={userDB.direccion}
          onChangeText={(e) => handleChange(e, "direccion")}
          placeholder="Dirección"
        ></TextInput>

        <TextInput
          value={userDB.mail}
          onChangeText={(e) => handleChange(e, "mail")}
          placeholder="Correo"
        ></TextInput>

        <TextInput
          value={userDB.contraseña}
          onChangeText={(e) => handleChange(e, "contraseña")}
          placeholder="Contraseña"
        ></TextInput>

        <TextInput
          value={userDB.telefono}
          onChangeText={(e) => handleChange(e, "telefono")}
          placeholder="Telefono"
        ></TextInput>

        {saveButton && (
          <View>
            <Text>Guardar cambios</Text>
            <Text>Descartar cambios</Text>
          </View>
        )}
      </View>
    )
  );
}
