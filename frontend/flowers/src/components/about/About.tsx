import Footer from "../footer/Footer";
import Header from "../header/header";
import Image from "next/image";
import Owner from "../../../assets/about.jpg";
import flowers from "../../components/about/about.json";
import tulips from "../../../assets/tulips.jpg";
import Btn from "../button/Button";
import { Box, Typography } from "@mui/material";
const About = () => {
  return (
    <Box>
      <Header />
      <Typography
        variant="h2"
        className="font-bold text-[50px] leading-[110%] tracking-[-0.02em] uppercase text-[#171615] text-center pb-[80px]"
      >
        About
      </Typography>
      <Typography
        variant="h5"
        className="font-bold text-[14px] leading-[140%] tracking-[0.02em] uppercase text-[#575757] text-center"
      >
        Our story
      </Typography>

      <Box className="flex gap-4 justify-center mt-[20px] flex-col items-center md:flex-row-reverse md:items-start">
        <Box>
          <Typography
            variant="subtitle1"
            className="!font-bold text-[18px] leading-[140%] uppercase text-[#2C2825]"
          >
            Lily Smith
          </Typography>
          <Typography className="!font-bold text-[15px] leading-[140%] tracking-[-0.025em] text-black/60">
            Owner
          </Typography>
        </Box>

        <Image src={Owner} alt="Lily Smith" width={446} height={500} />
      </Box>

      <Typography
        variant="subtitle2"
        style={{ fontWeight: "bold", fontSize: "40px", margin: "70px auto" }}
        className="max-w-[1200px] leading-[110%] tracking-[-0.025em] text-[#171615] text-center"
      >
        Our Blooms was founded in honor of Lily Smith’s loving aunts, Teresa and
        Beth.
      </Typography>

      <Box className="flex justify-center gap-[20px] max-w-[95%] mx-auto lg:max-w-none">
        {flowers.map((flower) => (
          <Box key={flower.id}>
            <Image src={flower.src} width={335} height={400} alt={flower.alt} />
          </Box>
        ))}
      </Box>

      <Box className="flex flex-col items-center gap-[20px] my-[70px] ">
        <Typography
          variant="body1"
          style={{ fontWeight: 500, fontSize: "24px" }}
          className="text-[24px] leading-[140%] tracking-[-0.01em] text-[#2C2825] max-w-[85%] md:max-w-[610px]"
        >
          Lily’s journey with flowers began in the heart of Oregon, amidst the
          flourishing fields of her aunts&apos; flower farm. It was there,
          surrounded by the abundance of nature, that she discovered her passion
          for floral design. From learning the names of each bloom to
          understanding the delicate balance of a bouquet, she absorbed the
          artistry of flowers like the rich Oregon soil.
        </Typography>
        <Typography
          variant="body1"
          style={{ fontWeight: 500, fontSize: "24px" }}
          className="text-[24px] leading-[140%] tracking-[-0.01em] text-[#2C2825] max-w-[85%] md:max-w-[610px]"
        >
          Bloom & Co. is the expression of that lifelong passion, a place where
          her love for flowers translates into beautifully curated arrangements
          that bring joy and elegance to your spaces.
        </Typography>
      </Box>

      <Image src={tulips} alt="tulips" style={{ margin: "0 auto" }} />

      <Box className="my-[70px] flex flex-col items-center gap-[20px]">
        <Typography
          variant="body1"
          sx={{
            maxWidth: { xs: "85%", md: "400px" },
            fontWeight: 600,
          }}
        >
          From humble beginnings, Bloom&Co has grown into a beloved local
          destination, known for its artistic arrangements, personal service,
          and commitment to quality.
        </Typography>

        <Typography
          sx={{
            maxWidth: { xs: "85%", md: "400px" },
            fontWeight: 600,
          }}
        >
          Discover how we can add a touch of natural beauty to your next event.
        </Typography>
      </Box>

      <Box className="flex justify-center mb-[80px]">
        <Btn text="Book a consultation" bgColor="#FFC800" />
      </Box>

      <Footer />
    </Box>
  );
};

export default About;
