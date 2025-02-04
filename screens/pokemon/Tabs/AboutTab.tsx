"use dom";
import React, { FC } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getEnglishFlavorText } from "@/utils/convertUnits";

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
  const eggGroups = detailedInfo.egg_groups.map((item) => item.name).join(", ");
  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        About {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Typography>

      <Paper elevation={3} sx={styles.infoBox}>
        <Typography variant="body1" sx={styles.flavorText}>
          {getEnglishFlavorText(detailedInfo)}
        </Typography>

        {[
          { label: "Happiness", value: detailedInfo.base_happiness },
          { label: "Capture Rate", value: detailedInfo.capture_rate },
          { label: "Habitat", value: detailedInfo.habitat?.name || "Unknown" },
          { label: "Baby", value: detailedInfo.is_baby ? "Yes" : "No" },
          { label: "Mythical", value: detailedInfo.is_mythical ? "Yes" : "No" },
          {
            label: "Legendary",
            value: detailedInfo.is_legendary ? "Yes" : "No",
          },
          { label: "Egg Groups", value: eggGroups || "Unknown" },
        ].map((item, index) => (
          <Box key={index}>
            <Box sx={styles.infoRow}>
              <Typography sx={styles.label}>{item.label}:</Typography>
              <Typography sx={styles.value}>{item.value}</Typography>
            </Box>
            {index !== 7 && <Divider sx={styles.divider} />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default AboutTab;

const styles = {
  container: {
    py: 3,
    px: 2,
  },
  title: {
    fontWeight: "bold",
    mb: 2,
    color: "#d32f2f",
  },
  infoBox: {
    p: 2,
    backgroundColor: "#f9f9f9",
    borderRadius: 2,
  },
  flavorText: {
    mb: 3,
    fontStyle: "italic",
    color: "#555",
  },
  infoRow: {
    display: "flex",
    mb: 1.5,
  },
  label: {
    minWidth: 120,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    textTransform: "capitalize",
    color: "#555",
  },
  divider: {
    mb: 1,
  },
};
