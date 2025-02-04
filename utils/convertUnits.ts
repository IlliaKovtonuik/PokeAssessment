export function getEnglishFlavorText(speciesResponse: any): string {
  const flavorTextEntry = speciesResponse.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );

  if (flavorTextEntry) {
    return flavorTextEntry.flavor_text.replace(/[\n\f\r]/g, " ");
  } else {
    return "";
  }
}
