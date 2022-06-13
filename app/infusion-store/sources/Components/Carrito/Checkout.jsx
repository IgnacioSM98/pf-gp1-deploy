import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default function Checkout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://pf-gp1-deploy.vercel.app/carrito",
        }}
      />
    </SafeAreaView>
  );
}
