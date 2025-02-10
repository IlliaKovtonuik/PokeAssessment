import React, { FC, useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { getEnglishFlavorText } from "@/utils/convertUnits";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "@/navigation/types/types";
import About from "./About";
type AboutTabProps = MaterialTopTabScreenProps<TabParamList, "About">;

const AboutTab: React.FC<AboutTabProps> = ({ route, navigation }) => {
  const { data, info } = route.params;
  const pokemon = data;
  const flavor_text_entries = info.flavor_text_entries;
  const detailedInfo = info;
  const eggGroups = detailedInfo.egg_groups.map((item) => item.name).join(", ");
  const englishVersion = getEnglishFlavorText(flavor_text_entries);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
      >
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <>
      <About
        pokemon={pokemon}
        detailedInfo={info}
        flavor_text_entries={englishVersion}
        eggGroups={eggGroups}
      />
    </>
  );
};

export default AboutTab;
