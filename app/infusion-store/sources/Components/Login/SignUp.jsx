import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/actions";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { app, authentication } from "../../../firebase";
import { setData } from "../../Functions/localStorage";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default function SignUp({ setIsAuthenticated }) {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const createUser = () => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: nombre,
          })
          .then(() => {
            setIsAuthenticated(true);

            setData("user", {
              nombre: res.user.displayName,
              email: res.user.email,
              uid: res.user.uid,
              photoURL: res.user.photoURL,
            });

            dispatch(
              setUserInfo({
                displayName: res.user.displayName,
                email: res.user.email,
                uid: res.user.uid,
                photoURL: res.user.photoURL,
              })
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err, "error al crear cuenta");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={(text) => setApellido(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              name={passwordVisible ? "eye" : "eye-off"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={createUser}
      >
        <Text style={styles.buttonOutlineText}>Registrate</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
