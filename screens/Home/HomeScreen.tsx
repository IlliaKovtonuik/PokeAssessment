import React, { useState } from "react";
import { getPokemons, getPokemonByName } from "@/api";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import PokeballBg from "@/components/PokeballBg/PokeballBg";
import { theme } from "@/config/theme/global-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { colors } from "@/config/theme/colors";

const HomeScreen = () => {
  const queryClient = useQueryClient();
  const { top } = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", "infinite"],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async ({ pageParam }) => {
      const pokemons = await getPokemons(pageParam);
      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(["pokemon", pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const localPokemons = data?.pages.flat() ?? [];
  const localFiltered = query.trim()
    ? localPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )
    : localPokemons;

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getPokemonByName(query),
    enabled: query.trim().length > 0 && localFiltered.length === 0,
    retry: false,
  });

  const displayData = query.trim()
  ? localFiltered.length > 0
    ? localFiltered
    : searchData 
      ? [searchData]
      : []
  : localPokemons;
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
          left={<TextInput.Icon icon="magnify" />}
          style={styles.searchInput}
          outlineStyle={{ borderRadius: 25 }}
        />
        {isSearchLoading && (
          <Text testID="searching-indicator">Searching...</Text>
        )}
        {searchError && <Text testID="error-message">Pokémon not found</Text>}
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
