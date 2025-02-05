import { useState } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { getPokemons, getPokemonByName } from "@/api";
import { Pokemon } from "@/domain/entities/pokemon";

interface UsePokemonsResult {
  query: string;
  setQuery: (value: string) => void;
  displayData: Pokemon[];
  isInitialLoading: boolean;
  isSearchLoading: boolean;
  searchError: unknown;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  resetState: () => void;
}

export const usePokemons = (): UsePokemonsResult => {
  const queryClient: QueryClient = useQueryClient();
  const [query, setQuery] = useState<string>("");
  const resetState = () => {
    setQuery("");
  };
  const {
    isLoading: isInitialLoading,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Pokemon[], unknown>({
    queryKey: ["pokemons", "infinite"],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async ({ pageParam }): Promise<Pokemon[]> => {
      const pokemons = await getPokemons(pageParam as number);
      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(["pokemon", pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (_lastPage, pages) => pages.length,
  });

  const localPokemons: Pokemon[] = data?.pages.flat() ?? [];

  const localFiltered: Pokemon[] = query.trim()
    ? localPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )
    : localPokemons;

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useQuery<Pokemon, unknown>({
    queryKey: ["search", query],
    queryFn: () => getPokemonByName(query),
    enabled: query.trim().length > 0 && localFiltered.length === 0,
    retry: false,
  });

  const hasQuery = query.trim() !== "";
  const hasLocalFiltered = localFiltered.length > 0;
  const hasSearchData = Boolean(searchData);
  const filteredData: Pokemon[] = hasLocalFiltered ? localFiltered : [];
  const searchDataArray: Pokemon[] =
    hasSearchData && searchData ? [searchData] : [];

  const filteredOrSearchData: Pokemon[] = hasLocalFiltered
    ? filteredData
    : searchDataArray;

  const displayData: Pokemon[] = hasQuery
    ? filteredOrSearchData
    : localPokemons;

  return {
    query,
    setQuery,
    displayData,
    isInitialLoading,
    isSearchLoading,
    searchError,
    fetchNextPage,
    hasNextPage,
    resetState,
  };
};
