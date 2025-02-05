import { getPokemonById } from "./get-pokemon-by-id";
import { Pokemon } from "@domain/entities/pokemon";
import axios, { AxiosError } from "axios";
export const getPokemonsById = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonPromises: Promise<Pokemon>[] = ids.map(getPokemonById);

    return Promise.all(pokemonPromises);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Unexpected error: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred while fetching Pokémons.");
    }
  }
};
