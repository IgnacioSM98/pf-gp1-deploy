import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { Favorito, NavBar } from "../index";

const styles = StyleSheet.create({
  text: {
    left: "35%",
    fontSize: 20,
  },
  espacio: {
    marginTop: 45,
  },
});

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      axios(
        `https://proyecto-final-gp1.herokuapp.com/favoritos/wishlist/${userInfo.uid}`
      ).then((res) => {
        setFavoritos(res.data);
      });
    }
  }, []);

  return (
    <>
      <NavBar titulo="Favoritos" />
      <View>
        <FlatList
          style={{ height: "100%", marginTop: "2%" }}
          data={favoritos}
          renderItem={({ item }) => (
            <Favorito navigation={navigation} item={item} />
          )}
        />
      </View>
    </>
  );
}
