"use dom";
import React, { FC } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getEnglishFlavorText } from "../../../utils/convertUnits";

interface Ability {
  name: string;
}

interface EggGroup {
  name: string;
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
}

interface Pokemon {
  abilities: Ability[];
  avatar: string;
  name: string;
  id: number;
}

interface AboutTabParams {
  data: Pokemon;
  info: DetailedInfo;
}

interface AboutTabProps {
  route: {
    params: AboutTabParams;
  };
}
const AboutTab: FC<AboutTabProps> = ({ route }) => {
  const { data, info } = route.params;
  const pokemon = data;
  const detailedInfo = info;

  const abilities = pokemon.abilities.map((ability) => ability.name).join(", ");

  const eggGroups = detailedInfo.egg_groups.map((item) => item.name).join(", ");

  return (
    <Box sx={{ py: 3 }}>
      <Typography sx={{ mb: 5 }}>
        {getEnglishFlavorText(detailedInfo)}
      </Typography>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Happiness:
        </Typography>
        <Typography>{detailedInfo.base_happiness}</Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Capture Rate:
        </Typography>
        <Typography>{detailedInfo.capture_rate}</Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Habitat:
        </Typography>
        <Typography sx={{ textTransform: "capitalize" }}>
          {detailedInfo.habitat?.name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Baby:
        </Typography>
        <Typography sx={{ textTransform: "capitalize" }}>
          {detailedInfo.is_baby ? "Yes" : "No"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Mythical:
        </Typography>
        <Typography sx={{ textTransform: "capitalize" }}>
          {detailedInfo.is_mythical ? "Yes" : "No"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Abilities:
        </Typography>
        <Typography sx={{ textTransform: "capitalize" }}>
          {abilities}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Legendary:
        </Typography>
        <Typography sx={{ textTransform: "capitalize" }}>
          {detailedInfo.is_legendary ? "Yes" : "No"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography sx={{ minWidth: 110, fontWeight: "bold" }}>
          Egg Groups:
        </Typography>
        <Typography sx={{ textTransform: "capitalize" }}>
          {eggGroups}
        </Typography>
      </Box>
    </Box>
  );
};
export default AboutTab;
