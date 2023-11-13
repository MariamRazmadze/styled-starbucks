const API_URL = "https://starbucksapi.pythonanywhere.com";

export async function getCoffees() {
  const res = await fetch(`${API_URL}/coffees`);
  if (!res.ok) throw Error("failed to fetch data");
  const { coffeeData } = await res.json();
  return coffeeData;
}
