import { pokeApi } from "@config/api/pokeApi";
import { maxPokedexId } from "@config/pokedex";
import { PokeAPIPaginatedResponse } from "@utils/helpers/interfaces/pokeApi.interface";
import axios, { AxiosError } from "axios";

export const getAllBasicPokemons = async () => {
  try {
    const url = `/pokemon?limit=${maxPokedexId}`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    return data.results.map((info) => ({
      name: info.name,
      id: Number(info.url.split("/")[6]),
    }));
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
