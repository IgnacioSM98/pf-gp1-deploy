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
import { Favorito } from "../index";

const styles = StyleSheet.create({
  text: {
    left: "35%",
    fontSize: 20,
  },
});

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    axios(
      "https://proyecto-final-gp1.herokuapp.com/favoritos/wishlist/kHXq79CbI7delhbqeFLdG3WJBqk2"
    ).then((res) => {
      setFavoritos(res.data);
    });
  }, []);

  return (
    <View>
      <FlatList
        data={favoritos}
        renderItem={({ item }) => (
          <Favorito navigation={navigation} item={item} />
        )}
      />
    </View>
  );
}
