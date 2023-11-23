const API_URL = "https://starbucksapi.pythonanywhere.com";
// const API_URL = "http://127.0.0.1:5000/";

export async function getCoffees() {
  const res = await fetch(`${API_URL}/coffees`);
  if (!res.ok) throw Error("failed to fetch data");
  const { coffeeData } = await res.json();
  return coffeeData;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { orderId } = await res.json();
    console.log(orderId);
    return { id: orderId };
  } catch {
    throw Error("Failed creating your order");
  }
}
