import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getPokemonById } from "@/api";
import { Pokemon } from "@/domain/entities/pokemon";

export const usePokemon = (
  pokemonId: string | number | undefined
): UseQueryResult<Pokemon> => {
  return useQuery<Pokemon>({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(Number(pokemonId)),
    staleTime: 1000 * 60 * 60,
    enabled: !!pokemonId,
  });
};
