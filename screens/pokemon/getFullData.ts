import { getPokemonById, getPokemonSpeciesById } from "../../api";

export async function getFullPokemonData(pokemonId: number) {
  const [pokemonData, speciesData] = await Promise.all([
    getPokemonById(pokemonId),
    getPokemonSpeciesById(pokemonId),
  ]);

  return {
    ...pokemonData,
    species: speciesData,
  };
}
