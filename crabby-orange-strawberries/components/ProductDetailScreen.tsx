import React from "react";
import { View, Text, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types/types";

const ProductDetailScreen = ({ route }: any) => {
  const { product }: { product: Product } = route.params;

  const saveProduct = async () => {
    const existing = await AsyncStorage.getItem("saved");
    const parsed: Product[] = existing ? JSON.parse(existing) : [];

    parsed.push(product);
    await AsyncStorage.setItem("saved", JSON.stringify(parsed));
    alert("Saved!");
  };

  return (
    <View style={{ padding: 10 }}>
      <Image source={{ uri: product.image }} style={{ height: 200 }} />
      <Text>{product.title}</Text>
      <Text>₹ {product.price}</Text>
      <Text>{product.description}</Text>

      <Button title="Save Product" onPress={saveProduct} />
    </View>
  );
};

export default ProductDetailScreen;