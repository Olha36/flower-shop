import Image from "next/image";
import Logo from "../../../assets/logo.svg";
import Rose from "../../../assets/rose.png";
import AboutUs from "../about-us/AboutUs";
import Gallery from "../gallery/Gallery";
import OurMission from "../our-mission/OurMission";
import Lilac from "../../../assets/lilac.png";
import WorkWithUs from "../work-with-us/WorkWithUs";
import Footer from "../footer/Footer";

const Main = () => {
  return (
    <>
      <Image
        src={Logo}
        alt="Logo"
        width={1200}
        height={100}
        className="pt-[68px] pb-[44px] mx-auto"
      />
      <Image
        src={Rose}
        alt="rose"
        width={1200}
        height={100}
        className="mx-auto mb-[120px]"
      />
      <AboutUs />
      <Gallery />
      <OurMission />
      <Image
        src={Lilac}
        alt="rose"
        width={1200}
        height={100}
        className="mx-auto mb-[200px]"
      />
      <WorkWithUs />
      <Footer  />
    </>
  );
};

export default Main;
