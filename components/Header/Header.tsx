import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pokeball } from "@/components";

interface HeaderProps {
  backgroundColor: string;
  picture: string;
  name: string;
  id: number;
  types: string[];
}

function formatPokemonId(id: number | string): string {
  if (id == null) return "000";
  return String(id).padStart(3, "0");
}
const Header = memo(function Header({
  backgroundColor,
  picture,
  name,
  id,
  types,
}: HeaderProps) {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const formattedId = useMemo(() => formatPokemonId(id), [id]);

  return (
    <View
      testID="pokemon-header"
      style={[styles.container, { backgroundColor }]}
    >
      <View style={styles.square} />

      <View style={styles.cta}>
        <TouchableOpacity style={styles.iconButton} onPress={handleGoBack}>
          <AntDesign name="arrowleft" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => {}} />
      </View>

      <View style={styles.wrapPicture}>
        <Pokeball size={280} position={40} />
        <Image source={{ uri: picture }} style={styles.picture} />
      </View>

      <View style={styles.wrapText}>
        <Text style={styles.title}>{name}</Text>
        <Text style={[styles.badge, styles.id]}>#{formattedId}</Text>
      </View>

      <View style={styles.wrapTypes}>
        {types?.map((typeStr) => (
          <Text key={typeStr} style={styles.badge}>
            {typeStr}
          </Text>
        ))}
      </View>

      <View style={styles.tabBg} />
    </View>
  );
});
export default Header;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 430,
    position: "relative",
  },
  square: {
    position: "absolute",
    top: -30,
    left: -50,
    width: 150,
    height: 150,
    transform: [{ rotate: "60deg" }],
    backgroundColor: "rgba(255,255,255,.15)",
  },
  cta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  iconButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapPicture: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: -20,
    width: "100%",
    zIndex: 1,
  },
  picture: {
    width: 280,
    height: 280,
  },
  wrapText: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  wrapTypes: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  badge: {
    color: "#ffffff",
    textTransform: "capitalize",
    backgroundColor: "rgba(255,255,255,.15)",
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  id: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabBg: {
    position: "absolute",
    width: "100%",
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
    bottom: -5,
  },
});
