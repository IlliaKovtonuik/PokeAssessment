import { Stack } from "expo-router";
import React from "react";
const StackNavigator = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="pokemon" options={{ title: "Pokemon" }} />
    </Stack>
  );
};
export default StackNavigator;
