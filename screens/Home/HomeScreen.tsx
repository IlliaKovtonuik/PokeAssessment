import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import PokeballBg from "@/components/PokeballBg/PokeballBg";
import { theme } from "@/config/theme/global-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { colors } from "@/config/theme/colors";
import { usePokemons } from "@hooks/usePokemons";
import { useFocusEffect } from "expo-router";
const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const {
    query,
    setQuery,
    displayData,
    isInitialLoading,
    isSearchLoading,
    searchError,
    fetchNextPage,
    hasNextPage,
    resetState,
  } = usePokemons();

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetState();
      };
    }, [])
  );
  return (
    <View style={{ flex: 1 }} testID="home-screen">
      <View style={[styles.header, { paddingTop: top, alignItems: "center" }]}>
        <Text style={styles.title}>Pokedex</Text>
        <TextInput
          testID="search-input"
          placeholder="Search Pokémon..."
          value={query}
          onChangeText={setQuery}
          mode="outlined"
          style={styles.searchInput}
          outlineStyle={{ borderRadius: 25 }}
        />
        {isSearchLoading && (
          <Text testID="searching-indicator">Searching...</Text>
        )}
        {Boolean(searchError) && (
          <Text testID="error-message">Pokémon not found</Text>
        )}
      </View>

      <PokeballBg style={styles.imgPosition} />

      <View style={theme.globalMargin}>
        <FlatList
          testID="pokemon-list"
          data={displayData}
          keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} testID={`pokemon-card-${item.name}`} />
          )}
          onEndReached={query.trim() ? null : () => fetchNextPage()}
          onEndReachedThreshold={0.6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: "absolute",
    top: -100,
    right: -100,
  },
  header: {
    backgroundColor: colors.red,
    height: 200,
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "CustomFont",
    fontSize: 38,
    lineHeight: 60,
    color: "white",
  },
  searchInput: {
    marginBottom: 8,
    width: "90%",
  },
});

export default HomeScreen;
