import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addCarrito,
  agregarCarrito,
  eliminarDeFavoritos,
  añadirAFavoritos,
  getProductReviews,
} from "../../../redux/actions";
import { StarRating } from "../index";

const styles = StyleSheet.create({
  contProd: {
    width: "100%",
    height: "100%",
    paddingTop: 45,
    position: "relative",
  },

  nombre: {
    fontWeight: "600",
    color: "white",
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 30,
  },

  descripcion: {
    color: "white",
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
  },

  contFoto: {
    width: "100%",
    height: 500,
    backgroundColor: "white",
    borderRadius: 40,
  },

  img: {
    width: "100%",
    height: 350,
    marginTop: 30,
    resizeMode: "contain",
  },

  contDatos: {
    width: "100%",
    height: 550,
    backgroundColor: "#333334",
    borderRadius: 40,
    paddingTop: "5%",
    display: "flex",
    position: "absolute",
    top: 450,
  },

  volver: {
    position: "absolute",
    fontSize: 30,
    top: 60,
    left: 30,
    zIndex: 9,
  },

  favoritos: {
    position: "absolute",
    fontSize: 30,
    top: 70,
    right: 30,
    zIndex: 999,
  },

  numeros: {
    fontWeight: "bold",
    color: "white",
    margin: 30,
    fontSize: 30,
  },
  botones: {
    position: "absolute",
    bottom: "20%",
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    margin: 30,
  },
  cantidad: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  pressable: {
    position: "relative",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "#414345",
    width: 60,
    height: 60,
    borderRadius: 15,
    // paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },

  boton: {
    position: "absolute",
    left: "10%",
    top: "10%",
    height: "80%",
    width: "80%",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "#414345",
  },

  agregar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 25,
    width: 180,
    height: 68,
    borderRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },

  letraBoton: {
    color: "white",
    fontSize: 30,
  },

  num: {
    color: "white",
    fontSize: 30,
    margin: 10,
  },

  promedio: {
    marginLeft: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  review: {
    // paddingTop: 8,
    fontSize: 14,
    marginLeft: 8,
    color: "white",
  },
});

const DetalleProducto = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const favoritos = useSelector((state) => state.favoritos);
  const reviews = useSelector((state) => state.reviews);

  // useEffect(() => {
  //   console.log("hola");
  // }, []);

  function addToCarrito(e) {
    if (data.stock > 0) {
      dispatch(agregarCarrito(id, 1));
    }
  }

  //reviews de producto
  useEffect(() => {
    dispatch(getProductReviews(id));
  }, []);

  // Creamos la variable a utilizar
  var rating = 0;

  // Sumarizamos la cantidad de estrellas entre todas las reviews
  reviews[0]
    ? reviews.map((reviews) => (rating += reviews.puntaje))
    : (rating = 1);

  // Dividimos la suma de estrellas por cantidad de review para saber el promedio
  if (reviews.length) {
    rating = rating / reviews.length;
  } else {
    rating = rating / 1;
  }
  // Redondeamos el promedio de estrellas
  rating = Math.round(rating);

  useEffect(() => {
    fetch(`https://proyecto-final-gp1.herokuapp.com/producto/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.error(error));
  }, [id]);

  function handleFav() {
    if (favoritos.find((fav) => fav.id == id)) {
      dispatch(eliminarDeFavoritos(id));
      alert("Producto eliminado de favoritos");
    } else {
      dispatch(añadirAFavoritos(data));
      alert("Producto agregado a la lista de favoritos");
    }
  }

  return (
    <View style={styles.contProd}>
      <AntDesign
        style={styles.volver}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {user && (
        <View style={styles.favoritos}>
          {favoritos.find((fav) => fav.id == id) ? (
            <AntDesign
              onPress={handleFav}
              name="heart"
              size={24}
              color="black"
            />
          ) : (
            <Octicons
              onPress={handleFav}
              name="heart"
              size={24}
              color="black"
            />
          )}
        </View>
      )}

      <View style={styles.contFoto}>
        <Image source={{ uri: data.imagen }} style={styles.img} />
      </View>

      <View style={styles.contDatos}>
        <Text style={styles.nombre}>{data.nombre}</Text>

        <View style={styles.promedio}>
          <StarRating rating={rating ? rating : 1} />
          <Text style={styles.review}>({reviews.length} Reviews)</Text>
        </View>

        <Text style={styles.descripcion}>{data.descripcion}</Text>
        <Text style={styles.numeros}>${data.precio}</Text>

        <View style={styles.botones}>
          <View style={styles.cantidad}>
            <Pressable style={styles.pressable}>
              <Text style={styles.boton}>-</Text>
            </Pressable>

            <Text style={styles.num}>01</Text>

            <Pressable style={styles.pressable}>
              <Text style={styles.boton}>+</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={(e) => {
              addToCarrito(e);
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? "rgba(194, 194, 194, 0.69)"
                  : "#414345",
              },
              styles.agregar,
            ]}
          >
            <Text style={styles.letraBoton}>Agregar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DetalleProducto;
