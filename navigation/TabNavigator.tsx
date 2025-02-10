import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  AboutTab,
  StatsTab,
  EvolutionTab,
  MovesTab,
} from "@screens/Pokemon/Tabs";
import { colors } from "@/config/theme/colors";
import { TabParamList } from "./types/types";
import { DetailedInfo } from "./types/types";
import { Pokemon } from "@/domain/entities/pokemon";
import { usePokemonContext } from "@/utils/PokemonContext";
const Tab = createMaterialTopTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  const { pokemon, additionalInfo } = usePokemonContext();
  return (
    <Tab.Navigator
      testID="tab-navigator"
      screenOptions={{
        swipeEnabled: true,
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        tabBarIndicatorStyle: { backgroundColor: colors.tabIndicator },
        tabBarLabelStyle: { textTransform: "capitalize" },
        tabBarPressColor: colors.red,
        tabBarPressOpacity: 0.5,
      }}
    >
      <Tab.Screen
        name="About"
        component={AboutTab}
        initialParams={{ data: pokemon, info: additionalInfo }}
      />
      <Tab.Screen
        name="Stats"
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
