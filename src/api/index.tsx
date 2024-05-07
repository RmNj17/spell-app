import axios from "axios";

const BASE_URL = "https://www.dnd5eapi.co/api";

export async function fetchSpells(): Promise<
  { index: string; name: string; level: string }[]
> {
  try {
    const result = await axios.get(`${BASE_URL}/spells`);
    return result.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchSpellDetail(spellIndex: string) {
  try {
    const result = await axios.get(`${BASE_URL}/spells/${spellIndex}`);
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
