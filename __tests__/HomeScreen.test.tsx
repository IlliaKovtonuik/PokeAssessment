import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "@/screens/Home/HomeScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getPokemons, getPokemonByName } from "@/api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { act } from "react-test-renderer";

// Mock the components
jest.mock("@/components/PokeballBg/PokeballBg", () => "PokeballBg");
jest.mock("@/components/PokemonCard/PokemonCard", () => "PokemonCard");

// Mock the API calls
jest.mock("@/api", () => ({
  getPokemons: jest.fn(),
  getPokemonByName: jest.fn(),
}));

// Mock navigation
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock SafeAreaContext
jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock theme
jest.mock("@/config/theme/global-theme", () => ({
  theme: {
    globalMargin: {
      padding: 20,
    },
  },
}));

describe("HomeScreen", () => {
  let queryClient: QueryClient;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0,
        },
      },
    });

    jest.clearAllMocks();
    (getPokemons as jest.Mock).mockResolvedValue(mockPokemons);
    (getPokemonByName as jest.Mock).mockResolvedValue(mockPokemons[0]);
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllTimers();
  });

  const mockPokemons = [
    {
      id: "1",
      name: "bulbasaur",
      types: ["grass", "poison"],
      avatar: "https://example.com/bulbasaur.png",
      sprites: {},
      games: [],
      stats: [],
      abilities: [],
      moves: [],
    },
    {
      id: "2",
      name: "ivysaur",
      types: ["grass", "poison"],
      avatar: "https://example.com/ivysaur.png",
      sprites: {},
      games: [],
      stats: [],
      abilities: [],
      moves: [],
    },
  ];

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <PaperProvider>{component}</PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  };

  it("renders initial pokemon list", () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);

    jest.runAllTimers();

    const homeScreen = getByTestId("home-screen");
    expect(homeScreen).toBeTruthy();
    expect(getPokemons).toHaveBeenCalled();
  });

  it("filters pokemon list based on search input", () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);

    jest.runAllTimers();

    const searchInput = getByTestId("search-input");
    expect(searchInput).toBeTruthy();

    fireEvent.changeText(searchInput, "bulba");
    jest.runAllTimers();

    expect(getPokemons).toHaveBeenCalled();
  });

  it("shows loading state during search", () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);

    (getPokemonByName as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockPokemons[0]), 100)
        )
    );

    jest.runAllTimers();

    const searchInput = getByTestId("search-input");
    fireEvent.changeText(searchInput, "nonexistent");

    jest.runAllTimers();

    const loadingIndicator = getByTestId("searching-indicator");
    expect(loadingIndicator).toBeTruthy();
  });

  it("shows error message when pokemon is not found", async () => {
    const { getByTestId, findByTestId, debug } = renderWithProviders(
      <HomeScreen />
    );

    (getPokemonByName as jest.Mock).mockRejectedValueOnce(
      new Error("Not found")
    );

    jest.runAllTimers();

    const searchInput = getByTestId("search-input");
    fireEvent.changeText(searchInput, "nonexistent");

    await act(async () => {
      jest.runAllTimers();
      await Promise.resolve();
    });

    debug();

    const errorMessage = await findByTestId("error-message");
    expect(errorMessage).toBeTruthy();
  });
});
