"use dom";
import React, { FC } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "@/navigation/types/types";

type MovesTabProps = MaterialTopTabScreenProps<TabParamList, "Moves">;

const MovesTab: FC<MovesTabProps> = ({ route }) => {
  const { data } = route.params;
  const { moves } = data;
  const sortedMoves = moves
    .slice()
    .sort((a, b) => a.name.length - b.name.length);

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        {sortedMoves.map((move) => (
          <Grid size={4} key={move.name}>
            <Paper elevation={2} sx={styles.itemContainer}>
              <Typography sx={styles.itemName}>{move.name}</Typography>
              <Typography sx={styles.itemLevel}>{move.level} lvl</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovesTab;

const styles = {
  container: {
    py: 2,
    px: 2,
  },
  itemContainer: {
    padding: 1,
    textAlign: "center",
    borderRadius: 2,
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  itemName: {
    textTransform: "capitalize",
    fontWeight: 600,
    fontSize: "14px",
    color: "#333",
  },
  itemLevel: {
    fontSize: "12px",
    color: "#777",
  },
};
