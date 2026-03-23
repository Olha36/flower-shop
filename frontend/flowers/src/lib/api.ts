export async function getFlowers() {
  const res = await fetch("http://localhost:3001/flowers");

  if (!res.ok) {
    throw new Error("Failed to fetch flowers");
  }

  return res.json();
}
