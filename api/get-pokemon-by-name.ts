import { pokeApi } from "@config/api/pokeApi";
import { Pokemon } from "@domain/entities/pokemon";
import { PokeAPIPokemon } from "@utils/helpers/interfaces/pokeApi.interface";
import { PokemonMapper } from "@utils/helpers/mappers/pokemon.mapper";
import axios, { AxiosError } from "axios";
export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(
      `/pokemon/${name.toLowerCase()}`
    );
    const pokemon = PokemonMapper.fromPokeApiToEntity(data);

    return pokemon;
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
