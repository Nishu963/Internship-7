import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductListScreen from "../components/ProductListScreen";
import ProductDetailScreen from "../components/ProductDetailScreen";
import SavedScreen from "../components/SavedScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="Details" component={ProductDetailScreen} />
        <Stack.Screen name="Saved" component={SavedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;