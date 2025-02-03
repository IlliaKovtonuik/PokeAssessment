import { pokeApi } from "../config/api/pokeApi";
import { maxPokedexId } from "../config/pokedex";
import { PokeAPIPaginatedResponse } from "../utils/helpers/interfaces/pokeApi.interface";

export const getAllBasicPokemons = async () => {
  const url = `/pokemon?limit=${maxPokedexId}`;
  const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

  return data.results.map((info) => ({
    name: info.name,
    id: Number(info.url.split("/")[6]),
  }));
};
