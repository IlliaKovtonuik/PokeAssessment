import { getPokemonById, getPokemonSpeciesById } from "@/api";

describe("Pokemon API", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("fetches pokemon by id", async () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
      types: [{ type: { name: "grass" } }],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    });

    const result = await getPokemonById(1);
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        name: "bulbasaur",
      })
    );
  });

  it("handles api errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getPokemonById(999999)).rejects.toThrow();
  });
});
