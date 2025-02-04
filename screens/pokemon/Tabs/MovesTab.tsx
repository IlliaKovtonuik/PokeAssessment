import React from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";

export const MovesTab = ({ route }) => {
  const { data } = route.params;
  const { moves } = data;

  return (
    <View style={styles.container}>
      <FlatList
        data={moves}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemLevel}>{item.level}lvl</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemContainer: {
    // робимо ширину ~1/3
    width: "30%",
    alignItems: "flex-start",
  },
  itemName: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  itemLevel: {
    fontSize: 12,
    color: "#555",
  },
});
