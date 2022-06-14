import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { enviarConsulta } from "../../../../redux/actions";

export default function Contacto({ setOption }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ mail: "", consulta: "" });
  const [errors, setErrors] = useState({ mail: "", consulta: "" });

  function validate(input) {
    let error = {};
    if (input.mail.length === 0) {
      error.mail = "Debe ingresar un mail";
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.mail)) {
      error.mail = "Debe ingresar un mail valido";
    }
    if (input.consulta.length === 0) {
      error.consulta = "Debe completar el campo consulta";
    }
    if (input.consulta.length < 20) {
      error.consulta = "La consulta debe ser más específica";
    }
    return error;
  }

  const handleChange = (text, name) => {
    setInput({ ...input, [name]: text });
    setErrors(validate(input));
  };

  function handleSubmit() {
    dispatch(enviarConsulta(input));
    setErrors({ mail: "", consulta: "" });
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOption(false)}></Pressable>
      <Text style={styles.title}>Mail:</Text>
      <TextInput
        name="mail"
        placeholder=" Mail"
        style={styles.input}
        onChangeText={(text) => handleChange(text, "mail")}
      />
      <Text style={styles.error}>{errors.mail}</Text>
      <Text style={styles.title}>Consulta-Reclamo:</Text>
      <TextInput
        miltiline
        name="consulta"
        placeholder=" Consulta"
        style={[styles.input, styles.textarea]}
        onChangeText={(text) => handleChange(text, "consulta")}
      />
      <Text style={styles.error}>{errors.consulta}</Text>
      <TouchableHighlight style={styles.button} onPress={() => handleSubmit()}>
        <Text styles={styles.textButton}>ENVIAR</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  error: {
    fontSize: 12,
    color: "red",
  },
  button: {
    backgroundColor: "#CCC",
    textAlign: "center",
    justifyContent: "center",
    paggindTop: 15,
    paggindBottom: 15,
    borderRadius: 5,
    height: 50,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 5,
  },
  textarea: {
    height: 70,
    textAlign: "start",
    justifyContent: "start",
  },
  textButton: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
