import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Favorito, NavBar } from "../index";
import { getFavoritos } from "../../../redux/actions";

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
  const dispatch = useDispatch();
  const [favoritos, setFavoritos] = useState([]);
  const fav = useSelector((state) => state.favoritos);
  const userInfo = useSelector((state) => state.userInfo);

  /* useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      axios(
        `https://proyecto-final-gp1.herokuapp.com/favoritos/wishlist/${userInfo.uid}`
      ).then((res) => {
        setFavoritos(res.data);
      });
    }
  }, []);*/
  useEffect(() => {
    dispatch(getFavoritos(userInfo.uid));
  }, [userInfo]);

  return (
    <>
      <NavBar titulo="Favoritos" />

      <FlatList
        style={{ height: "100%", marginTop: "2%" }}
        data={fav}
        renderItem={({ item }) => (
          <Favorito navigation={navigation} item={item} />
        )}
      />
    </>
  );
}
