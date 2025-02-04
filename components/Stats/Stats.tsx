import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

type Stat = {
  name: string;
  value: number;
};

interface StatsProps {
  data: Stat[];
}

const StatsComponent: React.FC<StatsProps> = ({ data }) => {
  const maxStatValue = Math.max(...data.map((stat) => stat.value));
  return (
    <View style={styles.container}>
      {data.map((stat) => {
        const progress = maxStatValue
          ? Math.round(stat.value) / maxStatValue
          : 0;
        const safeProgress = parseFloat(progress.toFixed(0));
        return (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{stat.name}</Text>
            <View style={styles.barContainer}>
              <ProgressBar
                progress={safeProgress}
                color={"white"}
                style={styles.progressBar}
              />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default StatsComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  statName: {
    width: 80,
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  barContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  statValue: {
    width: 30,
    color: "white",
    textAlign: "right",
  },
});
