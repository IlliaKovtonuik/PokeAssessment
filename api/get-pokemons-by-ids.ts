import { getPokemonById } from "./get-pokemon-by-id";
import { Pokemon } from "../domain/entities/pokemon";

export const getPokemonsById = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonPromises: Promise<Pokemon>[] = ids.map(getPokemonById);

    return Promise.all(pokemonPromises);
  } catch (error) {
    throw new Error("Error getting - Pokemons By Ids");
  }
};
