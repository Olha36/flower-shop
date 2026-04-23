"use client";

import { Box, Typography, TextField, Button } from "@mui/material";
import Footer from "../footer/Footer";
import Header from "../header/header";
import Image from "next/image";
import tulips from "../../../assets/tulips.jpg";
import LazyReveal from "../main/LazyReveal";

const Contact = () => {
  return (
    <>
      <Header />

      <main>
        <LazyReveal>
          <Box
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: { xs: "20px", md: "40px" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: "40px",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "28px", md: "48px" },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Get in Touch With Us
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  color: "#555",
                  maxWidth: "500px",
                }}
              >
                We’d love to hear from you. Whether it’s a custom bouquet or a
                question — we’re here.
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                width: "100%",
                maxWidth: "500px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <Image
                src={tulips}
                alt="tulips"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </Box>
          </Box>
        </LazyReveal>

        <LazyReveal>
          <Box
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: { xs: "20px", md: "40px" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: "40px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <TextField label="Name" fullWidth />
              <TextField label="Email" fullWidth />
              <TextField label="Phone (optional)" fullWidth />
              <TextField label="Message" multiline rows={4} fullWidth />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF6B81",
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#ff4d6d",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: { xs: "grid", md: "flex" },
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
                width: "100%",
              }}
            >
              <Box
                sx={{ width: "100%", textAlign: { xs: "center", md: "left" } }}
              >
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: "28px", lineHeight: 1 }}
                  >
                    📍 Address
                  </Box>
                </Typography>

                <Typography
                  sx={{ color: "#555", fontSize: "20px", textAlign: "start" }}
                >
                  123 Flower Street, London
                </Typography>
              </Box>

              <Box
                sx={{ width: "100%", textAlign: { xs: "center", md: "left" } }}
              >
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: "28px", lineHeight: 1 }}
                  >
                    📞 Phone
                  </Box>
                </Typography>

                <Typography
                  sx={{ color: "#555", fontSize: "20px", textAlign: "start" }}
                >
                  +44 123 456 789
                </Typography>
              </Box>

              <Box
                sx={{ width: "100%", textAlign: { xs: "center", md: "left" } }}
              >
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: "28px", lineHeight: 1 }}
                  >
                    ✉️ Email
                  </Box>
                </Typography>

                <Typography
                  sx={{ color: "#555", fontSize: "20px", textAlign: "start" }}
                >
                  hello@flower.com
                </Typography>
              </Box>

              <Box
                sx={{ width: "100%", textAlign: { xs: "center", md: "left" } }}
              >
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: "28px", lineHeight: 1 }}
                  >
                    🕒 Working Hours
                  </Box>
                </Typography>

                <Typography
                  sx={{ color: "#555", fontSize: "20px", textAlign: "start" }}
                >
                  Mon–Sun: 9:00 – 20:00
                </Typography>
              </Box>
            </Box>
          </Box>
        </LazyReveal>

        <LazyReveal>
          <Box
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: { xs: "20px", md: "40px" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "400px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=London&hl=en&z=13&output=embed"
              />
            </Box>
          </Box>
        </LazyReveal>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
