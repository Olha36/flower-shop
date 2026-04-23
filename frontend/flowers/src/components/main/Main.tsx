import Image from "next/image";
import Logo from "../../../assets/logo.svg";
import Rose from "../../../assets/rose.png";
import AboutUs from "../about-us/AboutUs";
import Gallery from "../gallery/Gallery";
import OurMission from "../our-mission/OurMission";
import Lilac from "../../../assets/lilac.png";
import WorkWithUs from "../work-with-us/WorkWithUs";
import Footer from "../footer/Footer";
import LazyReveal from "../lazy-reveal/LazyReveal";

const Main = () => {
  return (
    <>
      <LazyReveal>
        <Image
          src={Logo}
          alt="Logo"
          width={900}
          height={100}
          className="pt-[68px] pb-[44px] mx-auto w-[90%] min-[1440px]:w-[900px] animate-pulse"
        />
      </LazyReveal>

      <LazyReveal delayMs={100}>
        <Image
          src={Rose}
          alt="rose"
          width={1200}
          height={100}
          className="mx-auto mb-[120px]"
        />
      </LazyReveal>

      <LazyReveal delayMs={100}>
        <AboutUs />
      </LazyReveal>
      <LazyReveal delayMs={120}>
        <Gallery />
      </LazyReveal>
      <LazyReveal delayMs={140}>
        <OurMission />
      </LazyReveal>

      <LazyReveal delayMs={100}>
        <Image
          src={Lilac}
          alt="rose"
          width={1200}
          height={100}
          className="mx-auto mb-[200px]"
        />
      </LazyReveal>

      <LazyReveal delayMs={140}>
        <WorkWithUs />
      </LazyReveal>
      <LazyReveal delayMs={80}>
        <Footer />
      </LazyReveal>
    </>
  );
};

export default Main;
