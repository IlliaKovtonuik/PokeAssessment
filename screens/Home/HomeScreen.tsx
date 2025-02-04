import React, { useContext, useState } from "react";
import { getPokemons, getPokemonByName } from "../../api";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, Icon, Text, TextInput } from "react-native-paper";
import PokeballBg from "../../components/ui/PokeballBg";
import { theme } from "../../config/theme/global-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PokemonCard from "../../components/pokemon/PokemonCard/PokemonCard";
import { colors } from "../../config/theme/colors";
import InputWithIcon from "../../components/Search/Search";
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
      : searchData || []
    : localPokemons;

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: top, alignItems: "center" }]}>
        <View>
          <Text
            style={{
              fontFamily: "CustomFont",
              fontSize: 38,
              lineHeight: 60,
              color: "white",
            }}
          >
            Pokedex
          </Text>
        </View>
        <TextInput
          placeholder="Search Pokémon..."
          value={query}
          onChangeText={setQuery}
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
          style={styles.searchInput}
          outlineStyle={{ borderRadius: 25 }}
        />

        {isSearchLoading && <Text>Searching...</Text>}
        {searchError && <Text>Pokémon not found</Text>}
      </View>
      <PokeballBg style={styles.imgPosition} />
      <View style={theme.globalMargin}>
        <FlatList
          data={displayData}
          keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
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
    marginHorizontal: 0,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  searchInput: {
    marginBottom: 8,
    width: "90%",
  },
});

export default HomeScreen;
