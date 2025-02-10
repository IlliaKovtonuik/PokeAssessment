"use dom";
import React, { FC, useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Імпортуємо Grid2
import { motion } from "framer-motion";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "@/navigation/types/types";

type EvolutionTabProps = MaterialTopTabScreenProps<TabParamList, "Skins">;

const EvolutionTab: FC<EvolutionTabProps> = ({ route }) => {
  const { data } = route.params;
  const { sprites } = data;
  const [loadedSprites, setLoadedSprites] = useState<number[]>([]);

  const handleLoad = (index: number) => {
    setLoadedSprites((prev) => [...prev, index]);
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        {sprites.map((sprite: string, index: number) => (
          <Grid size={6} key={`${sprite}-${index}`}>
            <Paper sx={styles.imageWrapper}>
              <Box sx={styles.imageContainer}>
                {!loadedSprites.includes(index) && (
                  <CircularProgress size={40} color="secondary" />
                )}
                <motion.img
                  src={sprite}
                  onLoad={() => handleLoad(index)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: loadedSprites.includes(index) ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EvolutionTab;

const styles = {
  container: {
    p: 2,
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#fafafa",
    display: "flex",
    justifyContent: "center",
  },
  gridContainer: {
    width: "100%",
  },
  imageWrapper: {
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  imageContainer: {
    width: 180,
    height: 180,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
};
