import Image from "next/image";
import FooterImg from "../../../assets/footer.jpg";

const Footer = () => {
  return (
    <>
      <Image
        src={FooterImg}
        width={1120}
        height={582}
        alt="footer"
        className="mx-auto"
      />
    </>
  );
};
export default Footer;
