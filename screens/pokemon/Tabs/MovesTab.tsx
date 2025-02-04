"use dom";
import React, { FC } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";

interface Move {
  name: string;
  level: number;
}

interface MovesTabProps {
  route: {
    params: {
      data: {
        moves: Move[];
      };
    };
  };
}

const MovesTab: FC<MovesTabProps> = ({ route }) => {
  const { data } = route.params;
  const { moves } = data;

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        {moves.map((move) => (
          <Grid item xs={4} key={move.name}>
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
