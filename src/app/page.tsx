"use client";
import { Grid, Box, Card, Typography } from "@mui/material";
import AuthLogin from "@/components/auth/AuthLogin";
import PageContainer from "./(Dashboard)/components/container/PageContainer";

const Login2 = () => {
  return (
    <PageContainer title="NS-International || Login">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={15}
              sx={{
                p: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: "600px",
                height: "400px",
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                display="flex"
                component="h2"
                alignItems="center"
                justifyContent="center"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  marginBottom: 2,
                  height: "100%",
                  flexDirection: "column", 
                }}
              >
                <Typography> WELCOME TO THE </Typography>
                NS-INTERNATIONAL

              </Box>

              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
