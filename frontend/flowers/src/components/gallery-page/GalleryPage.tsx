import Header from "@/components/header/header";
import { getFlowers } from "@/lib/api";
import type { Flower } from "@/types/flowers";
import Image from "next/image";
import galleryInfo from "@/components/gallery-page/galleryPage.json";
import Footer from "../footer/Footer";

const GalleryPageComponent = async () => {
  const flowers: Flower[] = await getFlowers();
  return (
    <div className="">
      <Header />
      <h2 className="font-bold text-[50px] leading-[110%] tracking-[-0.02em] uppercase text-[#171615] mt-[44px] mb-[80px] px-[40px]">
        Gallery
      </h2>
      <div>
        <h3 className="px-[40px] pb-[40px] font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#575757]">
          SEASONAL ARRANGEMENTS
        </h3>
        <div className="grid grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {flowers.map((flower) => (
            <div key={flower._id} className="">
              <div className="flex gap-2 items-center flex-col">
                <h2 className="font-bold text-[18px] leading-[140%] text-center uppercase text-[#2C2825]">
                  {flower.name}
                </h2>
                <p className="font-bold text-[15px] leading-[140%] text-center tracking-[-0.025em] text-black/60">
                  ${flower.price}/Bunch
                </p>
              </div>

              <div className="max-w-[330px] max-h-[318px] flex items-center justify-center mx-auto overflow-hidden my-[15px]">
                <Image
                  src={flower.image}
                  alt={flower.description}
                  width={330}
                  height={318}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <h3 className="px-[40px] py-[40px] font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#575757]">
          Services
        </h3>
        <div>
          {galleryInfo.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-center gap-[180px] mb-[70px]"
            >
              <div>
                <h4 className="font-bold text-[50px] leading-[110%] tracking-[-0.02em] uppercase text-[#171615 max-w-[488px] mb-[24px]">
                  {service.title}
                </h4>
                <p className="max-w-[488px] font-normal text-[17px] leading-[140%] tracking-[-0.025em] text-[#2C2825]">
                  {service.description}
                </p>
              </div>
              <div className="max-w-[330px] max-h-[318px]  overflow-hidden">
                <Image
                  src={service.src}
                  alt={service.alt}
                  width={488}
                  height={421}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="px-[40px] py-[40px] font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#575757] text-center">
            Work with us
          </h3>
          <p className="max-w-[400px] mx-auto font-bold text-[40px] leading-[110%] text-center tracking-[-0.025em] text-[#171615] mt-[20px] mb-[40px]">
            Discover how we can add a touch of natural beauty to your next
            event.
          </p>
          <button className="flex items-center justify-center gap-[10px] px-[12px] pt-[8px] pb-[6px] w-[120px] sm:w-[110px] h-[31px] sm:h-[34px] bg-[#FFC800] rounded-[4px] mx-auto mb-[120px]">
            ABOUT US
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPageComponent;
