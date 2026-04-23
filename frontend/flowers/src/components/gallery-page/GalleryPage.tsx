import Header from "@/components/header/header";
import { getFlowers } from "@/lib/api";
import type { Flower } from "@/types/flowers";
import Image from "next/image";
import galleryInfo from "@/components/gallery-page/galleryPage.json";
import Footer from "../footer/Footer";
import LazyReveal from "../lazy-reveal/LazyReveal";

const GalleryPageComponent = async () => {
  const flowers: Flower[] = await getFlowers();
  return (
    <div className="w-[95%] mx-auto lg:w-auto">
      <Header />
      <h2 className="text-center font-bold text-[50px] leading-[110%] tracking-[-0.02em] uppercase text-[#171615] mt-[44px] mb-[80px] px-[40px]">
        Gallery
      </h2>
      <div>
        <h3 className="text-center px-[40px] pb-[40px] font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#575757]">
          SEASONAL ARRANGEMENTS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {flowers.map((flower) => (
            <LazyReveal key={flower._id}>
              <div key={flower._id} className="">
                <div className="flex gap-2 items-center flex-col">
                  <h2 className="font-bold text-[18px] leading-[140%] text-center uppercase text-[#2C2825]">
                    {flower.name}
                  </h2>
                  <p className="font-bold text-[15px] leading-[140%] text-center tracking-[-0.025em] text-black/60">
                    ${flower.price}/Bunch
                  </p>
                </div>

                <div className="w-full aspect-[330/318] overflow-hidden mx-auto my-[15px] relative">
                  <Image
                    src={flower.image}
                    alt={flower.description}
                    fill
                    className="object-cover -z-10"
                  />
                </div>
              </div>
            </LazyReveal>
          ))}
        </div>

        <h3 className="text-center px-[40px] py-[40px] font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#575757]">
          Services
        </h3>

        <div className="max-w-[1000px] mx-auto">
          {galleryInfo.map((service) => (
            <LazyReveal key={service.id} delayMs={service.id * 100}>
              <div
                key={service.id}
                className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[180px] mb-[70px]"
              >
                <div className="text-center lg:text-left">
                  <h4 className="font-bold text-[30px] md:text-[50px] leading-[110%] tracking-[-0.02em] uppercase text-[#171615] max-w-[488px] mb-[24px]">
                    {service.title}
                  </h4>
                  <p className="max-w-[488px] font-normal text-[17px] leading-[140%] tracking-[-0.025em] text-[#2C2825]">
                    {service.description}
                  </p>
                </div>

                <div className="w-full max-w-[330px] aspect-[330/318] overflow-hidden relative">
                  <Image
                    src={service.src}
                    alt={service.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </LazyReveal>
          ))}
        </div>

        <LazyReveal>
          <div>
            <h3 className="px-[40px] py-[40px] font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#575757] text-center">
              Work with us
            </h3>
            <p className="max-w-[330px] md:max-w-[400px] mx-auto font-bold text-[30px] md:text-[40px] leading-[110%] text-center tracking-[-0.025em] text-[#171615] mt-[20px] mb-[40px]">
              Discover how we can add a touch of natural beauty to your next
              event.
            </p>
            <button className="flex items-center justify-center gap-[10px] px-[12px] pt-[8px] pb-[6px] w-[120px] sm:w-[110px] h-[31px] sm:h-[34px] bg-[#FFC800] rounded-[4px] mx-auto mb-[120px]">
              ABOUT US
            </button>
          </div>
        </LazyReveal>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPageComponent;
