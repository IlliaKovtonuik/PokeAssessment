import { pokeApi } from "../config/api/pokeApi";
import { PokemonSpecieResponse } from "../utils/helpers/interfaces/pokeApi.interface";

export const getPokemonSpeciesById = async (pokemonId: number) => {
  const url = `/pokemon-species/${pokemonId}/`;
  const { data } = await pokeApi.get<PokemonSpecieResponse>(url);
  return data;
};
