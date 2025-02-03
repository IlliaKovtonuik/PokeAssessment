import { pokeApi } from "../config/api/pokeApi";
import { Pokemon } from "../domain/entities/pokemon";
import { PokeAPIPokemon } from "../utils/helpers/interfaces/pokeApi.interface";
import { PokemonMapper } from "../utils/helpers/mappers/pokemon.mapper";

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);
    const pokemon = await PokemonMapper.fromPokeApiToEntity(data);
    return pokemon;
  } catch (error) {
    throw new Error("Error getting a Pokemon");
  }
};
