import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  // btn: {
  //   marginTop: 300,
  //   width: 200,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignSelf: "center",
  //   backgroundColor: "#0893FC",
  //   padding: 10,
  //   borderRadius: 5,
  // },

  // text: {
  //   left: "35%",
  //   fontSize: 20,
  // },

  // login: {
  //   color: "#fff",
  //   fontSize: 20,
  //   fontWeight: "500",
  // },

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

export default function Login({ flag, onAuth, setIsAuthenticated }) {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (flag) {
      onAuth();
    }
  }, [flag]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    console.log(GoogleAuthProvider, provider, "xd?");
    // signInWithPopup(authentication, provider)
    //   .then(async (res) => {
    //     const user = { ...res.user };

    //     setData("user", user);

    //     console.log(user, "ubuntu");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const registrar = () => {
    navigation.navigate("SignUp");
  };

  const logIn = () => {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
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
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForgotPass = (e) => {
    e.preventDefault();

    if (email) {
      sendPasswordResetEmail(authentication, email).then(() => {
        setEmail("");
      });
    } else {
      // handleNoEmail();
    }
  };

  return (
    // <View>
    //   <Text style={styles.text}>Si ma re dulce</Text>
    //   <TouchableOpacity onPress={onAuth} style={styles.btn}>
    //     <Text style={styles.login}>Login</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => setIsAuthenticated(true)}
    //     style={styles.btn}
    //   >
    //     <Text style={styles.login}>Login De Pana</Text>
    //   </TouchableOpacity>
    // </View>
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        {/* <TextInput
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
        /> */}

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={logIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleForgotPass}>
          <Text style={styles.buttonText}>Olvidaste la contraseña?</Text>
        </TouchableOpacity>

        {/* <FontAwesome
          name="google"
          size={24}
          color="black"
          onPress={googleSignIn}
        /> */}

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={registrar}
        >
          <Text style={styles.buttonOutlineText}>Registrate aca</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
