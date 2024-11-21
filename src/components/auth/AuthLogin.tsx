"use client";

import React from "react";
import { Box, Typography, Stack, } from "@mui/material";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NSIForm from "../Forms/Form";
import NSIInput from "../Forms/Input";
import { LoadingButton } from "@mui/lab";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { setCookie } from "@/axios/Cookies";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/actions/auth.services";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const loginSchema = z.object({
  name: z
    .string({
      required_error: "Please enter your user name"
    }),

  password: z
    .string({
      required_error: "Please enter your password",
      invalid_type_error: "Please enter a valid password",
    })
    .min(6, "Password must be at least 6 characters long"),
});
interface LoginResponse {
  data: {
    accessToken: string;
  };
  message: string;
}

const defualtValues = {
  name: '',
  password: '',
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [login, { error, isLoading, isSuccess }] = useLoginMutation() as any;
  const router = useRouter()
  
  const handleSubmit = async (data: FieldValues) => {
    try {
      const res = await login(data).unwrap() as LoginResponse;

      storeUserInfo({ accessToken: res?.data?.accessToken });
      setCookie('token', res?.data?.accessToken, { expires: 7 });

      toast.success(res.message || 'Login Successful!');
      router.push('/dashboard');

    } catch (err: any) {
      toast.error(err?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}
      <NSIForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
        <Stack spacing={2}>
          
          <Box>
            <NSIInput
              
              name="name"
              placeholder="Enter your username"
              label="User Name"
              fullWidth
            />
          </Box>

          <Box mt="16px">
            <NSIInput
              type="password"
              name="password"
              placeholder="Enter your password"
              label="Password"
              fullWidth

            />
          </Box>

          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            mb={5}
          >
            
           
          </Stack>
        </Stack>

        <Box>
          <LoadingButton
            loadingPosition="start"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            loading={isLoading}
            sx={{
              marginTop: "16px",
            }}
          >
            Login
          </LoadingButton>
        </Box>
      </NSIForm>
    </>
  );
};

export default AuthLogin;
