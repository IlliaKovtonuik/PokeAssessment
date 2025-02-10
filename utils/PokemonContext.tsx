import React, { createContext, useContext } from "react";
import { Pokemon } from "@/domain/entities/pokemon";
import { PokemonSpeciesResponse } from "@utils/helpers/interfaces/pokeApi.interface";

type PokemonContextType = {
  pokemon: Pokemon;
  additionalInfo: PokemonSpeciesResponse;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};

export const PokemonProvider: React.FC<{
  pokemon: Pokemon;
  additionalInfo: PokemonSpeciesResponse;
  children: React.ReactNode;
}> = ({ pokemon, additionalInfo, children }) => {
  console.log("Rendering PokemonProvider", { pokemon, additionalInfo });
  return (
    <PokemonContext.Provider value={{ pokemon, additionalInfo }}>
      {children}
    </PokemonContext.Provider>
  );
};
