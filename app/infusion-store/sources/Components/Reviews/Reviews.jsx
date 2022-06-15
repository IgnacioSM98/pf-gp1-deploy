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
import { StarRating } from "../index";

const styles = StyleSheet.create({
  revBack: {
    width: "100%",
    height: "200%",
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.98,
    zIndex: 999,
    backgroundColor: "grey",
    overflow: "scroll",
  },
  reviewContainer: {
    width: 280,
    height: 150,
    padding: 20,
    margin: 20,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    zIndex: 1000,
    
    
  },
  cerrarButton:{
    position: "absolute",
    top:80,
    left: "45%",
  },
  cerrar: {
    fontSize: 26,
    fontWeight: "bold",
    borderColor: "black",
    borderWidth: 3,
    padding: 10,
    borderRadius:50,
    textAlign: "center"
  },
  datos:{
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  titulo:{
    fontSize: 16,
    fontWeight: "bold",
    marginRight:60,
  }
});

const Reviews = (props) => {
  return (
    <>
      {props.state && (
        <View style={styles.revBack}>
          <TouchableOpacity style={styles.cerrarButton} onPress={() => props.setState(!props.state)}>
            <Text style={styles.cerrar}>X</Text>
          </TouchableOpacity>
          <View style={styles.reviewContainer}>
            <View style={styles.datos}>
              <Text style={styles.titulo}>{props.titulo}</Text>
              <Text>{props.fecha}</Text>
            </View>
            {props.puntaje && <StarRating rating={props.puntaje} />}
            {props.comentario && <Text>{props.comentario}</Text>}
          </View>
        </View>
      )}
    </>
  );
};

export default Reviews;
