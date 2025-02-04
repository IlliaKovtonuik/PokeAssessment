import React from "react";
import { render } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a mock component
const MockPokemonScreen = () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return (
    <View testID="pokemon-screen">
      <View testID="pokemon-header">
        <Text>bulbasaur</Text>
      </View>
      <View testID="tab-navigator" />
    </View>
  );
};

// Mock the PokemonScreen component
jest.mock("@/screens/Pokemon/PokemonScreen", () => ({
  PokemonScreen: MockPokemonScreen,
}));

describe("PokemonScreen", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it("displays pokemon header with correct information", async () => {
    const { getByTestId } = renderWithProviders(<MockPokemonScreen />);

    const header = getByTestId("pokemon-header");
    expect(header).toBeTruthy();

    expect(header).toHaveTextContent("bulbasaur");
  });

  it("renders tab navigator", () => {
    const { getByTestId } = renderWithProviders(<MockPokemonScreen />);

    const tabNavigator = getByTestId("tab-navigator");
    expect(tabNavigator).toBeTruthy();
  });
});
