import { getFlowers } from "@/lib/api";
import type { Flower } from "@/types/flowers";
import Image from "next/image";

export default async function Home() {
  const flowers: Flower[] = await getFlowers();

  return (
    <main className="p-10">
      <div className="grid grid-cols-3 gap-6">
        {flowers.map((flower) => (
          <div key={flower._id} className="">
            <h2 className="">{flower.name}</h2>
            <p className="">{flower.color}</p>

            <Image
              src={flower.image}
              alt={flower.description}
              width={100}
              height={100}
            />
            <p className="">{flower.price} грн</p>
          </div>
        ))}
      </div>
    </main>
  );
}
