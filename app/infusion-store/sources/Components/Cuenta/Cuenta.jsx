import React from "react";
import styled from "styled-components/native";
import { View, Text, Pressable } from "react-native";

const Container = styled.View`
  padding-top: 10%;
`;

const Button = styled.Pressable`
  padding-top: 10%;
`;

export default function Cuenta() {
  return (
    <Container>
      <Button>
        <Text>Ajustes de Perfil</Text>
      </Button>

      <Button>
        <Text>Historial de Compras</Text>
      </Button>

      <Button>
        <Text>Mis Reseñas</Text>
      </Button>

      <Button>
        <Text>Favoritos</Text>
      </Button>

      <Button>
        <Text>Notificaciones</Text>
      </Button>

      <Button>
        <Text>Seguridad</Text>
      </Button>

      <Button>
        <Text>Contacto</Text>
      </Button>

      <Button>
        <Text>Cerrar Sesión</Text>
      </Button>
    </Container>
  );
}
