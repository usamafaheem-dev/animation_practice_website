import type { Metadata } from "next";
import { Poppins, Playfair_Display, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Usama8Faheem — A New Dimension of Digital Expression",
  description: "Premium digital services agency. Motion, 3D design, UI/UX, and web development.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${playfair.variable} ${inter.variable} ${jakarta.variable}`}>
      <body className="font-poppins">{children}</body>
    </html>
  );
}
