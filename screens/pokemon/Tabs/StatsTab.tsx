"use dom";
import React, { FC, useEffect, useState } from "react";
import { Box, Divider, CircularProgress } from "@mui/material";
import { Stat } from "./Stat";

interface StatData {
  name: string;
  value: number;
}

interface StatsTabProps {
  route: {
    params: {
      data: {
        stats: StatData[];
      };
    };
  };
}

const StatsTab: FC<StatsTabProps> = ({ route }) => {
  const { data } = route.params;
  const stats = data.stats;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const total = stats.reduce((prev, curr) => prev + curr.value, 0) || 0;

  if (isLoading) {
    return (
      <Box sx={styles.loaderContainer}>
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      {stats.map((stat) => (
        <Stat
          key={stat.name}
          name={stat.name}
          baseStat={stat.value}
          maxStat={150}
        />
      ))}

      <Divider sx={styles.divider} />

      <Stat name="Total" baseStat={total} maxStat={1000} isTotal />
    </Box>
  );
};

export default StatsTab;
const styles = {
  container: {
    flex: 1,
    py: 2,
    px: 5,
  },
  divider: {
    my: 2,
  },
  loaderContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Займає всю висоту екрана для центрування
    backgroundColor: "#f9f9f9", // Легкий фон для кращої видимості
  },
};
