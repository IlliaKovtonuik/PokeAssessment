import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Stat } from "./Stat";

export const StatsTab = ({ route }) => {
  const { data } = route.params;
  const stats = data.stats;
  const total = stats.reduce((prev, curr) => prev + curr.value, 0) || 0;
  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <Stat
          key={stat.name}
          name={stat.name}
          baseStat={stat.value}
          percetange={150}
        />
      ))}
      <Stat name="Total" baseStat={total} percetange={1000} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
  },
});
