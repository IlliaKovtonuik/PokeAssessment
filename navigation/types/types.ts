export type TabParamList = {
  About: { data: Pokemon; info: DetailedInfo };
  Stats: {
    data: {
      stats: StatData[];
    };
  };
  Skins: {
    data: {
      sprites: string[];
    };
  };
  Moves: {
    data: {
      moves: Move[];
    };
  };
};
interface StatData {
  name: string;
  value: number;
}
interface Move {
  name: string;
  level: number;
}
interface DetailedInfo {
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

interface Pokemon {
  abilities: Ability[];
  avatar: string;
  name: string;
  id: number;
}
type Color = {
  name: string;
  url: string;
};
type FlavorTextEntry = {
  flavor_text: string;
  language: Color;
  version: Color;
};

interface Ability {
  name: string;
}

interface EggGroup {
  name: string;
}
