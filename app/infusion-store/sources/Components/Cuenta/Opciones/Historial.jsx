import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native";
import Cerrar from "../Cerrar";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../../../redux/actions";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {},
  cerrar: {
    marginBottom: 60,
  },
  compra: {
    width: "94%",
    display: "flex",
    flexDirection: "column",
    borderColor: "grey",
    borderWidth: 1,
    padding: 15,
    margin: "3%",
    marginTop: 20,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "white",
  },
  prod: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginTop: 10,
    marginLeft: 15,
  },
  titulo: {
    marginLeft: 15,
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  dato: {
    fontWeight: "bold",
  },
  estado: {
    fontWeight: "bold",
    color: "green",
  },
});

export default function Historial({ setOption }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.userInfo);
  const pedidos = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(getPedidos());
  }, [dispatch]);

  const filterByUser = (pedido) => {
    if (pedido.usuarioId === userInfo.uid) return pedido;
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.cerrar} onPress={() => setOption(false)}>
        <Cerrar />
      </Pressable>

      <ScrollView>
        {pedidos?.filter(filterByUser).map((pedido) => (
          <View style={styles.compra}>
            <Text style={styles.dato}>{`Pedido: #2022${pedido.id}`}</Text>
            <Text style={styles.estado}>Estado: {pedido.Estado}</Text>
            <Text style={styles.dato}>
              Tipo de Envío: {pedido.Tipo_de_envio}
            </Text>
            <Text style={styles.titulo}>Productos Comprados</Text>
            {pedido?.productos.map((el) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("DetalleProducto", { id: el.compra.productoId })
                  }
                >
                  <View style={styles.prod}>
                    <Text>Producto: {el?.nombre}</Text>
                    <Text>Cantidad: {el?.compra?.cantidad}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
