import { DM_Sans, Space_Mono } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Website Audit — Hallman's Power Washing | Online Nexus Marketing",
  description:
    "Full website audit report for hallmanspowerwashing.com covering performance, mobile, SEO, accessibility, content, security, and technical analysis.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <body style={{ margin: 0, padding: 0, background: "#09090b" }}>
        {children}
      </body>
    </html>
  );
}
