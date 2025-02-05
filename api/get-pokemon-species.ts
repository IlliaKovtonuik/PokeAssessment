import { pokeApi } from "@config/api/pokeApi";
import { PokemonSpecieResponse } from "@utils/helpers/interfaces/pokeApi.interface";
import axios, { AxiosError } from "axios";
export const getPokemonSpeciesById = async (pokemonId: number) => {
  try {
    const url = `/pokemon-species/${pokemonId}/`;
    const { data } = await pokeApi.get<PokemonSpecieResponse>(url);
    return data;
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
