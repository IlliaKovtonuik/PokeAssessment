import { useContext } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Image,
} from "react-native";
import { ThemeContext } from "../../utils/ThemeContext";
interface Props {
  style?: StyleProp<ImageStyle>;
}

const PokeballBg = ({ style }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const pokeballImg = isDark
    ? require("../../assets/pokeball-light.png")
    : require("../../assets/pokeball-dark.png");
  return (
    <Image
      source={pokeballImg}
      style={[
        {
          width: 300,
          height: 300,
          opacity: 0.3,
        },
        style,
      ]}
    />
  );
};
export default PokeballBg;
