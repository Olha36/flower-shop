'use client'
import Footer from "../footer/Footer";
import Header from "../header/header";
import Image from "next/image";
import Owner from "../../../assets/about.jpg";
import flowers from "../../components/about/about.json";
import tulips from "../../../assets/tulips.jpg";
import Btn from "../button/Button";
import { Box, FormControl, FormHelperText, InputLabel, Modal, TextareaAutosize, Typography } from "@mui/material";
import "../../css/animation.css";
import { contactSchema, type ContactFormValues } from "@/lib/schema";
import { modalStyle, textareaStyle } from "../about-us/modal.style";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledInput } from "../about-us/about-us.style";
const About = () => {
   const [open, setOpen] = useState(false);
  
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<ContactFormValues>({
      resolver: zodResolver(contactSchema),
      defaultValues: {
        name: "",
        email: "",
        message: "",
      },
      mode: "onBlur",
    });
  
    const handleOpen = () => setOpen(true);
  
    const handleClose = () => {
      setOpen(false);
      reset();
    };
  
    const onSubmit = async (data: ContactFormValues) => {
      console.log("Form submitted:", data);
      handleClose();
    };
  
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset();
      }
    }, [isSubmitSuccessful, reset]);
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
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            maxWidth: { xs: "85%", md: "610px" },
          }}
          className="leading-[140%] text-[#2C2825]"
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
            fontWeight: 500,
            fontSize: "24px",
            maxWidth: { xs: "85%", md: "610px" },
          }}
          className="leading-[140%] text-[#2C2825]"
        >
          From humble beginnings, Bloom&Co has grown into a beloved local
          destination, known for its artistic arrangements, personal service,
          and commitment to quality.
        </Typography>

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            maxWidth: { xs: "85%", md: "610px" },
          }}
          className="leading-[140%] text-[#2C2825]"
        >
          Discover how we can add a touch of natural beauty to your next event.
        </Typography>
      </Box>

      <Box
        className="button-animation"
        sx={{ display: "flex", justifyContent: "center", mb: "80px" }}
      >
        <Btn
          text="Book a consultation"
          bgColor="#FFC800"
          onClick={handleOpen}
         />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="contact-modal-title"
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "28px", sm: "34px" },
                lineHeight: 1.05,
                color: "#171615",
                mb: 1,
              }}
            >
              Contact Us
            </Typography>

            <Typography
              id="contact-modal-description"
              sx={{
                color: "#575757",
                fontSize: "15px",
                lineHeight: 1.6,
                mb: 3,
                maxWidth: 420,
              }}
            >
              Enter your details and we&apos;ll get back to you as soon as
              possible.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <FormControl fullWidth error={!!errors.name} required>
                <InputLabel
                  shrink
                  htmlFor="contact-name"
                  sx={{ position: "static", transform: "none", mb: 1 }}
                >
                  Name
                </InputLabel>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      {...field}
                      id="contact-name"
                      placeholder="Write your name here"
                      disableUnderline
                    />
                  )}
                />

                <FormHelperText>{errors.name?.message ?? " "}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={!!errors.email} required>
                <InputLabel
                  shrink
                  htmlFor="contact-email"
                  sx={{ position: "static", transform: "none", mb: 1 }}
                >
                  Email
                </InputLabel>

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      {...field}
                      id="contact-email"
                      type="email"
                      placeholder="Enter your email here"
                      disableUnderline
                    />
                  )}
                />

                <FormHelperText>{errors.email?.message ?? " "}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={!!errors.message} required>
                <InputLabel
                  shrink
                  htmlFor="contact-message"
                  sx={{ position: "static", transform: "none", mb: 1 }}
                >
                  Message
                </InputLabel>

                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      id="contact-message"
                      minRows={6}
                      placeholder="Tell us a bit about what you need"
                      style={textareaStyle}
                    />
                  )}
                />

                <FormHelperText>
                  {errors.message?.message ?? " "}
                </FormHelperText>
              </FormControl>

              <Box sx={{ pt: 1 }}>
                <Btn
                  text={isSubmitting ? "Sending..." : "Submit"}
                  bgColor="#FFC800"
                  type="submit"
                />
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>

      <Footer />
    </Box>
  );
};

export default About;
