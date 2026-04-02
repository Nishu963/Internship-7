import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types/types";

const SavedScreen = () => {
  const [saved, setSaved] = useState<Product[]>([]);

  const loadSaved = async () => {
    const data = await AsyncStorage.getItem("saved");
    if (data) setSaved(JSON.parse(data));
  };

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>❤️ Saved Products</Text>

      {saved.length === 0 ? (
        <Text style={styles.empty}>No saved products 😢</Text>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.title}</Text>
              <Text>₹ {item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});