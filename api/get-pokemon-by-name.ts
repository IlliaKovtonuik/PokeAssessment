import { pokeApi } from "../config/api/pokeApi";
import { Pokemon } from "../domain/entities/pokemon";
import { PokeAPIPokemon } from "../utils/helpers/interfaces/pokeApi.interface";
import { PokemonMapper } from "../utils/helpers/mappers/pokemon.mapper";

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(
      `/pokemon/${name.toLowerCase()}`
    );
    const pokemon = await PokemonMapper.fromPokeApiToEntity(data);
    return [pokemon];
  } catch (error) {
    throw new Error("Error getting a Pokemon");
  }
};
