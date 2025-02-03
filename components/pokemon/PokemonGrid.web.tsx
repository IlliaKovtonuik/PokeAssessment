"use dom";

import React from "react";
import { Box } from "@mui/material";
import PokemonCard from "./PokemonCard.web";
import { Pokemon } from "../../domain/entities/pokemon";

interface Props {
  pokemons: Pokemon[];
}

const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 2,
        p: 2,
      }}
    >
      {pokemons.map((pokemon) => (
        <Box key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </Box>
      ))}
    </Box>
  );
};

export default PokemonGrid;
