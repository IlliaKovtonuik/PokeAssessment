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
} from "react-native-paper";

// Адаптированные темы навигации
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Создаём контекст для темы
export const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  let theme = isDarkTheme ? DarkTheme : LightTheme;

  // Предотвращаем автоматическое скрытие Splash Screen
  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {
      /* Игнорируем, если вызов уже выполнен */
    });
  }, []);

  // Загружаем кастомный шрифт
  const [fontsLoaded] = useFonts({
    CustomFont: require("../assets/fonts/CustomFont.ttf"),
    // Можно добавить другие шрифты
  });

  // Когда шрифты загрузились, скрываем Splash Screen
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Пока шрифты не загрузились, ничего не рендерим
  if (!fontsLoaded) {
    return null;
  }

  // Расширяем тему, добавляя кастомные настройки шрифтов для react-native-paper
  theme = {
    ...theme,
    fonts: {
      ...theme.fonts,
      pokeFont: {
        fontFamily: "CustomFont",
        fontWeight: "bold",
      },
    },
  };

  return (
    <PaperProvider theme={theme}>
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
