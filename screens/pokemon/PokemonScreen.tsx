import { getPokemonById } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, StyleSheet, FlatList, Image } from "react-native";
import FullScreenLoader from "../../components/ui/FullScreenLoader";
import { Chip, FAB, Text, IconButton } from "react-native-paper";
import { FadeInImage } from "../../components/ui/FadeInImage";
import { getTypeColor } from "../../config/helpers/getTypeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeContext";
import PokemonTypeChip from "../../components/pokemon/PokemonTypeChip";
import { maxPokedexId } from "../../config/pokedex";

const PokemonScreen = () => {
  const router = useRouter();
  const { isDark } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const { pokemonId, reverse } = useLocalSearchParams();

  const { isLoading, data: pokemon } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(Number(pokemonId)),
    staleTime: 1000 * 60 * 60,
  });

  // Попереднє завантаження даних для наступного та попереднього покемона
  useQuery({
    queryKey: ["pokemon", Number(pokemonId) + 1],
    queryFn: () => getPokemonById(Number(pokemonId) + 1),
    staleTime: 1000 * 60 * 60,
  });
  useQuery({
    queryKey: ["pokemon", Number(pokemonId) - 1],
    queryFn: () => getPokemonById(Number(pokemonId) - 1),
    staleTime: 1000 * 60 * 60,
  });

  const pokeballImg = isDark
    ? require("../../assets/pokeball-dark.png")
    : require("../../assets/pokeball-light.png");

  if (!pokemon || isLoading) {
    return <FullScreenLoader />;
  }

  const pokemonColor = getTypeColor(pokemon.types);

  return (
    <>
      {/* Вимикаємо стандартний хедер */}
      <Stack.Screen
        options={{
          headerShown: false,
          animation: reverse ? "slide_from_left" : "slide_from_right",
        }}
      />

      {/* Кастомний хедер */}
      <View style={[styles.customHeader, { marginTop: top + 16 }]}>
        {/* Кнопка "назад" */}
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor="white"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        {/* Контейнер з текстом, що позиціонується по центру */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} variant="pokeFont">
            {pokemon.name}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: pokemonColor[0] }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Контейнер з покеболом та зображенням покемона */}
        <View style={styles.headerContainer}>
          <Image source={pokeballImg} style={styles.pokeball} />
          <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
        </View>

        {/* Типи */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginTop: 10,
            gap: 8,
          }}
        >
          {pokemon.types.map((type) => (
            <PokemonTypeChip key={type} type={type} size="large" />
          ))}
        </View>

        {/* Sprites */}
        <Text style={styles.subTitle}>Skins</Text>
        <FlatList
          data={pokemon.sprites}
          horizontal
          keyExtractor={(item, index) => `${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          centerContent
          style={{
            marginTop: 20,
            height: 100,
          }}
          renderItem={({ item }) => (
            <FadeInImage
              uri={item}
              style={{ width: 100, height: 100, marginHorizontal: 5 }}
            />
          )}
        />

        <Text style={styles.subTitle}>Abilities</Text>
        <FlatList
          data={pokemon.abilities}
          horizontal
          keyExtractor={(key) => key}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip selectedColor="white">
              <Text
                variant="medium"
                style={{ fontSize: 16, textTransform: "capitalize" }}
              >
                {item}
              </Text>
            </Chip>
          )}
        />

        <Text style={styles.subTitle}>Stats</Text>
        <FlatList
          data={pokemon.stats}
          horizontal
          keyExtractor={(key) => key.name}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.statsContainer}>
              <Text
                style={{
                  flex: 1,
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                {item.name}
              </Text>
              <Text style={{ color: "white" }}>{item.value}</Text>
            </View>
          )}
        />

        <Text style={styles.subTitle}>Moves</Text>
        <FlatList
          data={pokemon.moves}
          horizontal
          keyExtractor={(key) => key.name}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.statsContainer}>
              <Text
                style={{
                  flex: 1,
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                {item.name}
              </Text>
              <Text style={{ color: "white" }}>Lv.{item.level}</Text>
            </View>
          )}
        />

        <Text style={styles.subTitle}>Games</Text>
        <FlatList
          data={pokemon.games}
          horizontal
          keyExtractor={(key) => key}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip selectedColor="white">
              <Text
                variant="regular"
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: 8,
                  textTransform: "capitalize",
                }}
              >
                {item}
              </Text>
            </Chip>
          )}
        />
        <View style={{ height: 100 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
