import { getPokemonById, getPokemonSpeciesById } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import FullScreenLoader from "@/components/Loader/FullScreenLoader";
import { getTypeColor } from "@/config/helpers/getTypeColor";
import { TabNavigator } from "@/navigation/TabNavigator";
import { Header } from "@/components";
import { ThemeContext } from "@/utils/ThemeContext";
import React, { useContext } from "react";
import { usePokemon } from "@/hooks/usePokemon";
import { usePokemonSpecies } from "@/hooks/usePokemonSpecies";
import { PokemonProvider } from "@/utils/PokemonContext";
const PokemonScreen = () => {
  const { pokemonId, reverse } = useLocalSearchParams();
  const { isDark } = useContext(ThemeContext);
  const id = Array.isArray(pokemonId) ? pokemonId[0] : pokemonId;
  const { isLoading: isPokemonLoading, data: pokemon } = usePokemon(id);
  const { isLoading: isSpeciesLoading, data: additionalInfo } =
    usePokemonSpecies(id);

  if (!pokemon || isPokemonLoading || !additionalInfo || isSpeciesLoading) {
    return <FullScreenLoader indicatorColor={isDark ? "white" : "black"} />;
  }
  const pokemonColor = getTypeColor(pokemon.types);
  return (
    <PokemonProvider pokemon={pokemon} additionalInfo={additionalInfo}>
      <View testID="pokemon-screen" style={styles.container}>
        <Header
          backgroundColor={pokemonColor[0]}
          picture={pokemon?.avatar}
          name={pokemon.name}
          types={pokemon?.types}
          id={pokemon.id}
        />
        <View style={styles.tabsContainer}>
          <TabNavigator />
        </View>
      </View>
    </PokemonProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    width: "100%",
    backgroundColor: "transperent",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "transparent",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  headerTitleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "CustomFont",
    color: "white",
    textTransform: "capitalize",
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "bold",
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: "center",
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  rightFab: {
    backgroundColor: "white",
    position: "absolute",
    right: 16,
    bottom: 32,
  },
  leftFab: {
    backgroundColor: "white",
    position: "absolute",
    left: 16,
    bottom: 32,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: "absolute",
    bottom: -40,
  },
  subTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: "column",
    marginHorizontal: 20,
    alignItems: "center",
  },
});

export default PokemonScreen;
