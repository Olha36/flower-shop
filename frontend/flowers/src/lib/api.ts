import type { Flower } from "@/types/flowers";

const FLOWERS_API_URL = "http://localhost:3001/flowers";

export async function getFlowers(): Promise<Flower[]> {
  const res = await fetch(FLOWERS_API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch flowers");
  }

  return res.json();
}

export async function getFlowerById(id: string): Promise<Flower | null> {
  const flowers = await getFlowers();
  return flowers.find((flower) => flower._id === id) ?? null;
}
