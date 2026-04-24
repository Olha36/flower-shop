"use client";
import { INITIAL_STATE } from "@/constants/auth";
import { actions } from "@/data/actions";
import type { FormState } from "@/types/FormState";
import type { SignupFormData } from "@/types/SignupFormData";
import { Box, Link, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, FormLabel, Input } from "@mui/material";

import { AuthForm } from "../auth/AuthForm";

export function SignupForm() {
  const [formState, setFormState] = React.useState<FormState>(INITIAL_STATE);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setFormState(INITIAL_STATE);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await actions.auth.registerUserAction(
        INITIAL_STATE,
        formData
      );
      setFormState(result);

      if (result.success) {
        router.push("/products");
      }
    } catch {
      setFormState({
        success: false,
        message: "Failed to register.",
        strapiErrors: null,
        zodErrors: null,
      });
    }
  };

  return (
    <AuthForm
      title="Sign up"
      footer={
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle2" color="textSecondary">
            Already have an account?
          </Typography>
          <Link href="/auth/signin" underline="hover">
            Log in
          </Link>
        </Box>
      }
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username.message}</span>
          )}
          {formState.zodErrors?.username && (
            <span style={{ color: "red" }}>
              {formState.zodErrors.username[0]}
            </span>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@mail.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
          {formState.zodErrors?.email && (
            <span style={{ color: "red" }}>
              {formState.zodErrors.email[0]}
            </span>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
          {formState.zodErrors?.password && (
            <span style={{ color: "red" }}>
              {formState.zodErrors.password[0]}
            </span>
          )}
        </Box>

        <Button type="submit">Sign Up</Button>

        {formState.strapiErrors && (
          <Typography color="error">
            {formState.strapiErrors.message || "Something went wrong"}
          </Typography>
        )}
        {formState.message && (
          <Typography color={formState.success ? "success.main" : "error"}>
            {formState.message}
          </Typography>
        )}
      </Box>
    </AuthForm>
  );
}
