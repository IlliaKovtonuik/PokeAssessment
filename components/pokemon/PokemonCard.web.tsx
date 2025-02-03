"use dom";

import React, { useContext } from "react";
import { Pokemon } from "../../domain/entities/pokemon";
import { useRouter } from "expo-router";
import { ThemeContext } from "../../utils/ThemeContext";
import { getTypeColor } from "../../config/helpers/getTypeColor";
import { FadeInImage } from "../ui/FadeInImage";
import PokemonTypeChip from "./PokemonTypeChip";

// Імпортуємо компоненти Material UI
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from "@mui/material";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const router = useRouter();
  const typesColors = getTypeColor(pokemon.types);
  const backgroundColor = typesColors[0] || "grey";

  // Вибір зображення покебола залежно від теми
  const pokeballImg = isDark
    ? require("../../assets/pokeball-dark.png")
    : require("../../assets/pokeball-light.png");

  const handleClick = () => {
    router.navigate({
      pathname: "/pokemon",
      params: { pokemonId: pokemon.id },
    });
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        backgroundColor,
        borderRadius: 2,
        p: 1,
        m: 1,
        height: 120,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        boxShadow: 3,
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 1,
          }}
        >
          {/* Заголовок з ім'ям і номером */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                textTransform: "capitalize",
                lineHeight: 1,
              }}
            >
              {pokemon.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                textTransform: "capitalize",
                lineHeight: 1,
              }}
            >
              #{pokemon.id}
            </Typography>
          </Box>

          {/* Покебол як фон (позиційно абсолютний) */}
          <Box
            component="img"
            src={pokeballImg}
            alt="pokeball"
            sx={{
              position: "absolute",
              top: -25,
              right: -25,
              width: 100,
              height: 100,
              opacity: 0.4,
            }}
          />

          {/* Зображення покемона */}
          <FadeInImage
            uri={pokemon.avatar}
            style={{
              position: "absolute",
              bottom: -16,
              right: -12,
              width: 120,
              height: 120,
            }}
          />

          {/* Типи покемона */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: "auto",
            }}
          >
            {pokemon.types.map((type) => (
              <PokemonTypeChip key={type} type={type} />
              // Якщо компонент PokemonTypeChip не адаптований під Material UI,
              // його можна замінити на, наприклад, MUI Chip:
              // <Chip key={type} label={type} sx={{ textTransform: 'capitalize' }} />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
