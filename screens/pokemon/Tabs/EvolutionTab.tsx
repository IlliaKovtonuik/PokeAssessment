import React from "react";
import { ScrollView, FlatList } from "react-native";
import { FadeInImage } from "../../../components/ui/FadeInImage";
export const EvolutionTab = ({ route }) => {
  const { data } = route.params;
  const { sprites } = data;

  return (
    <ScrollView style={{ padding: 10 }}>
      <FlatList
        data={sprites}
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 220,
        }}
        renderItem={({ item }) => (
          <FadeInImage
            uri={item}
            style={{ width: 200, height: 200, marginHorizontal: 5 }}
          />
        )}
      />
    </ScrollView>
  );
};
