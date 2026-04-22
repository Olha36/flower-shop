import Link from "next/link";
import Btn from "../button/Button";
import { Box, Typography } from "@mui/material";
import "../../css/animation.css"
const WorkWithUs = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          mb: 2,
          textAlign: "center",
          color: "#575757",
          margin: "20px 0 40px",
          textTransform: "uppercase",
        }}
      >
        Work with us
      </Typography>

      <Typography
        sx={{
          maxWidth: { xs: "95%", lg: "740px" },
          fontWeight: "bold",
          margin: "20px auto 40px",
          fontSize: { xs: "30px", md: "40px" },
          textAlign: "center",
          color: "#171615",
          lineHeight: "110%",
        }}
      >
        Discover how we can add a touch of natural beauty to your next event.
      </Typography>
      <Link
        href="/about"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "120px",
        }}
      >
        <Box
          className="button-animation"
          sx={{ display: "flex", justifyContent: "center", mb: "80px" }}
        >
          <Btn bgColor="#FFC800" text="ABOUT US"></Btn>
        </Box>
      </Link>
    </>
  );
};

export default WorkWithUs;
