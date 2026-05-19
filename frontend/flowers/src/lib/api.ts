import type { Flower } from "@/types/flowers";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"
).replace(/\/+$/, "");
const FLOWERS_API_URL = `${API_URL}`;

export async function getFlowers(): Promise<Flower[]> {
  const res = await fetch(FLOWERS_API_URL);
  console.log(res, 'res')

  if (!res.ok) {
    throw new Error(
      `Failed to fetch flowers: ${res.status} ${res.statusText} from ${FLOWERS_API_URL}`
    );
  }

  return res.json();
}



export async function getFlowerById(id: string): Promise<Flower | null> {
  const flowers = await getFlowers();
  return flowers.find((flower) => flower._id === id) ?? null;
}
