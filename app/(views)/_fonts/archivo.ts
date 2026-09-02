import { Archivo } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
