import { Box, Typography } from "@mui/material";
import Btn from "../button/Button";
import './about-us.css'
const AboutUs = () => {
  return (
    <Box className="about-us">
      <Typography
        sx={{ fontWeight: "bold", fontSize: "14px", textAlign: "center" }}
        className="leading-[140%] tracking-[0.02em] uppercase text-[#575757] title-animation"
      >
        Who We Are
      </Typography>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: { sm: "36px", lg: "40px" },
          width: { sm: "412px", md: "220px", lg: "770px" },
          textAlign: "center",
          margin: "20px auto 40px",
        }}
        className="leading-[110%] tracking-[-0.025em] text-[#171615]"
      >
        We&apos;re Our Blooms® and we&apos;re here to help you find your floral
        story.
      </Typography>
      <Box className="flex justify-center mb-[80px]">
        <Btn text="Book a consultation" bgColor="#FFC800" />
      </Box>
    </Box>
  );
};
export default AboutUs;
