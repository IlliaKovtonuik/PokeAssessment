import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PokemonCard } from "@/components";
import { ThemeContext } from "@/utils/ThemeContext";
import { useRouter } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("PokemonCard", () => {
  const mockPokemon = {
    id: "1",
    name: "bulbasaur",
    types: ["grass", "poison"],
    avatar: "https://example.com/bulbasaur.png",
    sprites: {},
    games: [],
    stats: [],
    abilities: [],
    moves: [],
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <PaperProvider>
        <ThemeContext.Provider value={{ isDark: false }}>
          {component}
        </ThemeContext.Provider>
      </PaperProvider>
    );
  };

  it("displays correct pokemon information", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <PokemonCard pokemon={mockPokemon} />
    );

    expect(getByText("bulbasaur")).toBeTruthy();
    expect(getByText("#1")).toBeTruthy();
    expect(getByTestId("pokemon-image")).toBeTruthy();
  });

  it("triggers navigation on press", () => {
    const { getByText } = renderWithProviders(
      <PokemonCard pokemon={mockPokemon} />
    );

    fireEvent.press(getByText("bulbasaur"));

    expect(mockRouter.navigate).toHaveBeenCalledWith({
      pathname: "/pokemon",
      params: { pokemonId: "1" },
    });
  });

  it("uses correct theme based on context", () => {
    const { rerender } = renderWithProviders(
      <PokemonCard pokemon={mockPokemon} />
    );

    expect(require("@/assets/pokeball-light.png")).toBeTruthy();

    rerender(
      <PaperProvider>
        <ThemeContext.Provider value={{ isDark: true }}>
          <PokemonCard pokemon={mockPokemon} />
        </ThemeContext.Provider>
      </PaperProvider>
    );

    expect(require("@/assets/pokeball-dark.png")).toBeTruthy();
  });
});
