import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductListScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    
    setData([
      {
        id: 1,
        title: "iPhone 13",
        price: 70000,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-blue-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572315935",
      },
      {
        id: 2,
        title: "Running Shoes",
        price: 4000,
        image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-max-270-mens-shoes-KkLcGR.png",
      },
      {
        id: 3,
        title: "Laptop",
        price: 50000,
        image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06624556.png",
      },
      {
        id: 4,
        title: "Headphones",
        price: 2000,
        image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg",
      },
    ]);
  }, []);

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛍 Products</Text>

      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", { product: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    color: "green",
    marginTop: 5,
  },
});