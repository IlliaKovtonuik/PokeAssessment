import type { PokemonCustom } from "./pokemonList";
import type { Move, Pokemon, Stat } from "./pokemon";
import type { Species } from "./species";
import type { Evolution } from "./evolution";

export type StateProps = {
  pokemons: PokemonCustom[];
  pokemon: {
    about: About;
    stats: Stat[];
    evolution: Evolution | null;
    moves: Move[];
  };
};
export type About =
  | ({
      flavorText: string;
    } & Pick<Species, "egg_groups" | "habitat"> &
      Pick<Pokemon, "weight" | "height" | "abilities">)
  | null;
