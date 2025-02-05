import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from "@utils/helpers/interfaces/pokeApi.interface";
import { pokeApi } from "@config/api/pokeApi";
import { Pokemon } from "@domain/entities/pokemon";
import { PokemonMapper } from "@utils/helpers/mappers/pokemon.mapper";
import axios, { AxiosError } from "axios";
export const getPokemons = async (
  page: number,
  limit: number = 20
): Promise<Pokemon[]> => {
  try {
    const url = "/pokemon";
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url, {
      params: {
        offset: page * limit,
        limit,
      },
    });

    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });
    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemons = pokeApiPokemons.map((item) =>
      PokemonMapper.fromPokeApiToEntity(item.data)
    );

    return pokemons;
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
