export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  avatar: string;
  sprites: string[];
  games: string[];
  stats: Stat[];
  abilities: string[];
  moves: Move[];
}

export interface Stat {
  name: string;
  value: number;
}

export interface Move {
  name: string;
  level: number;
}
export interface DetailedInfo {
  base_happiness: number;
  capture_rate: number;
  habitat?: {
    name: string;
  };
  is_baby: boolean;
  is_mythical: boolean;
  is_legendary: boolean;
  egg_groups: EggGroup[];
  flavor_text_entries: FlavorTextEntry[];
}
type FlavorTextEntry = {
  flavor_text: string;
  language: Color;
  version: Color;
};
type Color = {
  name: string;
  url: string;
};
interface Ability {
  name: string;
}

interface EggGroup {
  name: string;
}
