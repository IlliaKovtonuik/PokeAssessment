import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AboutTab from "../screens/Pokemon/Tabs/AboutTab";
import { StatsTab } from "../screens/Pokemon/Tabs/StatsTab";
import { EvolutionTab } from "../screens/Pokemon/Tabs/EvolutionTab";
import { MovesTab } from "../screens/Pokemon/Tabs/MovesTab";

import { colors } from "../config/theme/colors";

const Tab = createMaterialTopTabNavigator();
type Props = {
  pokemon: any;
  additionalInfo: any;
};
export const TabNavigator: React.FC<Props> = ({ pokemon, additionalInfo }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        tabBarIndicatorStyle: { backgroundColor: colors.tabIndicator },
        tabBarLabelStyle: { textTransform: "capitalize" },
      }}
    >
      <Tab.Screen
        name="About"
        component={AboutTab}
        initialParams={{ data: pokemon, info: additionalInfo }}
      />
      <Tab.Screen
        name="Base Stats"
        component={StatsTab}
        initialParams={{ data: pokemon }}
      />
      <Tab.Screen
        name="Skins"
        component={EvolutionTab}
        initialParams={{ data: pokemon }}
      />
      <Tab.Screen
        name="Moves"
        component={MovesTab}
        initialParams={{ data: pokemon }}
      />
    </Tab.Navigator>
  );
};
