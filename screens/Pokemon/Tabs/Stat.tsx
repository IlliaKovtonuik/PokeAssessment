"use dom";
import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { green, red, grey, blue } from "@mui/material/colors";

interface StatProps {
  name: string;
  baseStat: number;
  maxStat: number;
  isTotal?: boolean;
}
const Stat: FC<StatProps> = ({ name, baseStat, maxStat, isTotal = false }) => {
  const statisticName = (name: string): string => {
    switch (name) {
      case "special-attack":
        return "Sp. Atk";
      case "special-defense":
        return "Sp. Def";
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  const progressPercentage = Math.min((baseStat / maxStat) * 100, 100);
  const getProgressColor = (isTotal: boolean, baseStat: number): string => {
    if (isTotal) {
      return blue[500];
    }

    return baseStat < 75 ? red[500] : green[500];
  };

  return (
    <Box sx={styles.statRow}>
      <Typography sx={styles.title}>{statisticName(name)}</Typography>
      <Typography sx={styles.statValue}>{baseStat}</Typography>
      <Box sx={styles.progressBarContainer}>
        <Box
          sx={{
            ...styles.progressBar,
            width: `${progressPercentage}%`,
            backgroundColor: getProgressColor(isTotal, baseStat),
          }}
        />
      </Box>
    </Box>
  );
};
export default Stat;
const styles = {
  statRow: {
    display: "flex",
    alignItems: "center",
    mb: 1.5,
  },
  title: {
    width: 80,
    fontWeight: 600,
    color: grey[800],
    textTransform: "capitalize",
  },
  statValue: {
    width: 40,
    textAlign: "center",
    fontWeight: 700,
    color: grey[900],
  },
  progressBarContainer: {
    flexGrow: 1,
    height: 8,
    backgroundColor: grey[300],
    borderRadius: 4,
    overflow: "hidden",
    ml: 1,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.3s ease-in-out",
  },
};
