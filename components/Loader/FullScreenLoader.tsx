import { ColorValue, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import React from "react";
interface Props {
  indicatorColor?: ColorValue;
  backgroundColor?: ColorValue;
}

const FullScreenLoader = ({ backgroundColor, indicatorColor }: Props) => {
  const { colors } = useTheme();
  const bgColor = backgroundColor ? backgroundColor : colors.background;

  return (
    <View
      testID="full-screen-loader"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
      }}
    >
      <ActivityIndicator color={indicatorColor} size={50} />
    </View>
  );
};
export default FullScreenLoader;
