"use dom";
import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { Pokemon, DetailedInfo } from "@domain/entities/pokemon";
interface AboutParamsList {
  detailedInfo: DetailedInfo;
  pokemon: Pokemon;
  eggGroups: string;
  flavor_text_entries: string;
}
const About: React.FC<AboutParamsList> = ({
  pokemon,
  detailedInfo,
  eggGroups,
  flavor_text_entries,
}) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        About {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Typography>

      <Paper elevation={3} sx={styles.infoBox}>
        <Typography variant="body1" sx={styles.flavorText}>
          {flavor_text_entries}
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

export default About;

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
  loaderContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
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
