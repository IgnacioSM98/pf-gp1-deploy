import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import { imagenes } from "./Data";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width;
const ESPACIO = 10;

export default function Carousel() {
  return (
    <SafeAreaView>
      <FlatList
        data={imagenes}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={ANCHO_CONTENEDOR}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: ANCHO_CONTENEDOR }}>
              <View>
                <Image
                  key={index}
                  source={{
                    uri:
                      item ||
                      "https://educacion30.b-cdn.net/wp-content/uploads/2018/02/mistake.jpg",
                  }}
                  style={styles.image}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
    margin: 0,
    marginBottom: 10,
  },
});
