"use client";
import { INITIAL_STATE } from "@/constants/auth";
import { actions } from "@/data/actions";
import { FormState } from "@/types/FormState";
import { Box, Button, FormLabel, Input, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { Button } from "../../ui/Button";
// import { Input } from "../../ui/Input";
// import { Label } from "../../ui/Label";
import { AuthForm } from "../auth/AuthForm";

type LoginFormInputs = { identifier: string; password: string };

export function SigninForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setFormState(INITIAL_STATE);
    try {
      const formData = new FormData();
      formData.append("identifier", data.identifier);
      formData.append("password", data.password);

      const result = await actions.auth.loginUserAction(INITIAL_STATE, formData);
      setFormState(result);

      if (result.success) {
        router.push("/products");
      } else {
        setFormState(result);
      }
    } catch (err) {
      if (err instanceof Error) {
        setFormState({ success: false, message: err.message });
      } else {
        setFormState({ success: false, message: "Login failed" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Sign In"
      footer={
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle2" color="textSecondary">
            Don&apos;t have an account?
          </Typography>
          <Link href="/auth/signup">Sign up</Link>
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
          <FormLabel htmlFor="identifier">Email or username</FormLabel>
          <Input
            id="identifier"
            type="text"
            placeholder="example@mail.com"
            {...register("identifier", {
              required: "Email or username is required",
            })}
          />
          {errors.identifier && (
            <span style={{ color: "red" }}>{errors.identifier.message}</span>
          )}
          {formState.zodErrors?.identifier && (
            <span style={{ color: "red" }}>
              {formState.zodErrors.identifier[0]}
            </span>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            {...register("password", { required: "Password is required" })}
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>

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
