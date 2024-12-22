"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NS-International </title>
      </head>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <Providers>
            <Toaster richColors position="top-center"/>
            <CssBaseline />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
