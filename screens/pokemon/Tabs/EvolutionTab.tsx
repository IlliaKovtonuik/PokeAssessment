"use dom";
import React, { FC, useState, useRef, useEffect } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { motion } from "framer-motion";

interface EvolutionTabProps {
  route: {
    params: {
      data: {
        sprites: string[];
      };
    };
  };
}

const EvolutionTab: FC<EvolutionTabProps> = ({ route }) => {
  const { data } = route.params;
  const { sprites } = data;
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLoad = () => {
    if (isMounted.current) {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        {sprites.map((sprite, index) => (
          <Grid item xs={6} key={`${sprite}-${index}`}>
            <Box sx={styles.imageWrapper}>
              <Box sx={styles.imageContainer}>
                {isLoading && <CircularProgress size={40} color="secondary" />}
                <motion.img
                  src={sprite}
                  onLoad={handleLoad}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: isLoading ? 0 : 1,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Box>
            </Box>
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
    height: "100vh", // Повноекранна висота
    overflowY: "auto", // Вертикальний скролінг
    backgroundColor: "#fafafa", // Легкий фон для контрасту
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 1,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Легка тінь для глибини
  },
  imageContainer: {
    width: 180,
    height: 180,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
};
