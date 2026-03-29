import Image from "next/image";
import Logo from "../../../assets/logo.svg";
import Rose from "../../../assets/rose.png";
import AboutUs from "../about-us/AboutUs";
import Gallery from "../gallery/Gallery";
import OurMission from "../our-mission/OurMission";


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
    </>
  );
};

export default Main;
