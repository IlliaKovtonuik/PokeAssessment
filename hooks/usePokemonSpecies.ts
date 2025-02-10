import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getPokemonSpeciesById } from "@/api";
import { PokemonSpecieResponse } from "@/utils/helpers/interfaces/pokeApi.interface";

export const usePokemonSpecies = (
  pokemonId: string | number | undefined
): UseQueryResult<PokemonSpecieResponse> => {
  return useQuery<PokemonSpecieResponse>({
    queryKey: ["pokemonInfo", pokemonId],
    queryFn: () => getPokemonSpeciesById(Number(pokemonId)),
    staleTime: 1000 * 60 * 60,
    enabled: !!pokemonId,
  });
};
