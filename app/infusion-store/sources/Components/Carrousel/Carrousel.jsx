import React, { useState } from "react";
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

const width2 = Dimensions.get("window").width;
const height2 = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width2;
const ALTO_CONTENEDOR = height2 * 0.23;
const ESPACIO = 10;

const styles = StyleSheet.create({
  image: {
    width: ANCHO_CONTENEDOR,
    height: ALTO_CONTENEDOR,
    resizeMode: "cover",

    margin: 0,
    marginBottom: 10,

    borderRadius: 1,
  },

  contenedorPaginado: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

const { width, height } = Dimensions.get("window");

export default function Carousel() {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  return (
    <View>
      <FlatList
        data={imagenes}
        style={{ borderRadius: 4 }}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={ANCHO_CONTENEDOR}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: ANCHO_CONTENEDOR, height: ALTO_CONTENEDOR }}>
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.contenedorPaginado}>
        {imagenes.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                height: 10,
                width: 10,
                background: "#595959",
                margin: 8,
                borderRadius: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
