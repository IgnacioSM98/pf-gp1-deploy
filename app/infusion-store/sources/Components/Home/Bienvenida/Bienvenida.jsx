import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { getData } from "../../../Functions/localStorage";

export default function Bienvenida() {
  const [user, setUser] = useState({});

  getData("user").then((rodri) => {
    setUser(rodri);
  });

  return (
    <View>
      <Text>{user.firstName}</Text>
      <Image></Image>
    </View>
  );
}
