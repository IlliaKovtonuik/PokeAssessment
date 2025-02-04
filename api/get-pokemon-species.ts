import { pokeApi } from "@config/api/pokeApi";
import { PokemonSpecieResponse } from "@utils/helpers/interfaces/pokeApi.interface";

export const getPokemonSpeciesById = async (pokemonId: number) => {
  try {
    const url = `/pokemon-species/${pokemonId}/`;
    const { data } = await pokeApi.get<PokemonSpecieResponse>(url);
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch species for Pokémon ID: ${pokemonId}`);
  }
};
