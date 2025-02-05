export type Color = {
  name: string;
  url: string;
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: Color;
  version: Color;
};

export function getEnglishFlavorText(
  flavorTextEntries: FlavorTextEntry[]
): string {
  const flavorTextEntry = flavorTextEntries.find(
    (entry: FlavorTextEntry) => entry.language.name === "en"
  );

  if (flavorTextEntry) {
    return flavorTextEntry.flavor_text.replace(/[\n\f\r]/g, " ");
  }
  return "";
}
