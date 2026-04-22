"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Btn from "../button/Button";
import "../../css/animation.css";
import { StyledInput } from "./about-us.style";
import { contactSchema, type ContactFormValues } from "@/lib/schema";
import { modalStyle, textareaStyle } from "./modal.style";

const AboutUs = () => {
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
    <Box className="about-container">
      <Typography
        variant="h2"
        className="title-animation"
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          textAlign: "center",
          textTransform: "uppercase",
          color: "#575757",
        }}
      >
        Who We Are
      </Typography>

      <Typography
        className="text-animation"
        sx={{
          fontWeight: "bold",
          fontSize: { sm: "36px", lg: "40px" },
          width: { sm: "412px", md: "220px", lg: "770px" },
          textAlign: "center",
          margin: "20px auto 40px",
          lineHeight: "110%",
          letterSpacing: "-0.025em",
          color: "#171615",
        }}
      >
        We&apos;re Our Blooms® and we&apos;re here to help you find your floral
        story.
      </Typography>

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
    </Box>
  );
};

export default AboutUs;
