import React, { useEffect, useState } from "react";
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
const ALTO_CONTENEDOR = height2 * 0.25;
// const ESPACIO = 10;

const styles = StyleSheet.create({
  image: {
    width: ANCHO_CONTENEDOR,
    height: ALTO_CONTENEDOR,
    resizeMode: "cover",
    // resizeMethod: "contain",
    // marginBottom: 10,

    // borderRadius: 15,
  },

  contenedorPaginado: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "red",
  },
});

const { width, height } = Dimensions.get("window");
let flatList;

function infiniteScroll(dataList) {
  const numberOfData = dataList && dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(function () {
    scrolled++;
    if (scrolled < numberOfData) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }
    flatList &&
      flatList.scrollToOffset({ animated: true, offset: scrollValue });
  }, 3000);
}

export default function Carrousel() {
  const scrollX = new Animated.Value(0.01);
  const position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState();

  useEffect(() => {
    setDataList(imagenes);
    infiniteScroll(dataList);
  });

  return (
    <View>
      <FlatList
        data={imagenes}
        ref={(ref) => {
          flatList = ref;
        }}
        style={{ borderRadius: 10, marginTop: 40, marginHorizontal: 3 }}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={ANCHO_CONTENEDOR}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ANCHO_CONTENEDOR,
                height: ALTO_CONTENEDOR,
              }}
            >
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
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                height: 7,
                width: 7,
                backgroundColor: "#595959",
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
