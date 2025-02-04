import { pokeApi } from "@config/api/pokeApi";
import { Pokemon } from "@domain/entities/pokemon";
import { PokeAPIPokemon } from "@utils/helpers/interfaces/pokeApi.interface";
import { PokemonMapper } from "@utils/helpers/mappers/pokemon.mapper";

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);
    const pokemon = PokemonMapper.fromPokeApiToEntity(data);
    return pokemon;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `API Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error("No response received from the server.");
    } else {
      throw new Error(`Error getting a Pokemon: ${error.message}`);
    }
  }
};
