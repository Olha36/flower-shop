import Image from "next/image";
import missions from "./mission.json";
import { Box, Typography } from "@mui/material";

const OurMission = () => {
  return (
    <Box>
      <Box className="mb-[40px]">
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { sx: "36px", md: "45px", lg: "50px" },
          }}
          className=" text-[#171615] uppercase leading-[-0.02em]"
        >
          What We Do
        </Typography>
        <Typography
          sx={{ margin: "40px auto 0", textAlign: "center", fontSize: "16px" }}
          className="leading-[140%] tracking-[-0.025em] text-[#2C2825]"
        >
          We bring a touch of that simple magic into your world.
        </Typography>
      </Box>
      <Box>
        {missions.map((mission) => (
          <Box key={mission.id}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "50px", textAlign: "center" }}
              className="leading-[110%] tracking-[-0.02em] uppercase text-[#171615]"
            >
              {mission.number}
            </Typography>
            <Image
              src={mission.src}
              width={145}
              height={145}
              alt={mission.alt}
              className="my-[80px] mx-auto"
            />
            <Typography
              variant="h4"
              sx={{
                maxWidth: "540px",
                width: "95%",
                margin: "0 auto",
                fontWeight: "bold",
                fontSize: { sx: "30px", md: "45px" },
              }}
              className="leading-[110%] text-center tracking-[-0.02em] uppercase text-[#171615]"
            >
              {mission.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: "540px",
                width: "95%",
                margin: "30px auto 80px",
                textAlign: "center",
                fontSize: "16px",
              }}
              className="leading-[140%] tracking-[-0.025em] text-[#2C2825]"
            >
              {mission.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OurMission;
