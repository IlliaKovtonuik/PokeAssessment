import React, { createContext, PropsWithChildren, useEffect } from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";

import {
  adaptNavigationTheme,
  Provider as PaperProvider,
  MD3LightTheme,
} from "react-native-paper";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
  isDark: false,
  // Початкове значення – хай буде Light, щоби TS не лаявся
  theme: LightTheme,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";

  // === 2) ВИБИРАЄМО ТЕМУ ЗАЛЕЖНО ВІД colorScheme ===
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {});
  }, []);

  const [fontsLoaded] = useFonts({
    CustomFont: require("../assets/fonts/CustomFont.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationThemeProvider value={theme}>
        <ThemeContext.Provider
          value={{
            isDark: isDarkTheme,
            theme,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </NavigationThemeProvider>
    </PaperProvider>
  );
};
