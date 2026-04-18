import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yhopping — Optimización Financiera y Operativa para PyMEs",
  description:
    "Consultoría CFO/COO para PyMEs mexicanas. Flujo de caja, diagnóstico financiero, automatización Office 365. Expertise 20+ años. Primer diagnóstico gratis.",
  keywords: [
    "CFO fraccional",
    "optimización financiera",
    "PyMEs México",
    "flujo de caja",
    "automatización Office 365",
    "diagnóstico financiero",
    "consultoría empresarial",
    "Monterrey",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/images/yhopping_favicon_16px.png", sizes: "16x16", type: "image/png" },
      { url: "/images/yhopping_favicon_32px.png", sizes: "32x32", type: "image/png" },
      { url: "/images/yhopping_favicon_64px.png", sizes: "64x64", type: "image/png" },
      { url: "/images/yhopping_favicon_128px.png", sizes: "128x128", type: "image/png" },
      { url: "/images/yhopping_favicon_256px.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: "/images/yhopping_favicon_128px.png", sizes: "128x128", type: "image/png" },
      { url: "/images/yhopping_favicon_256px.png", sizes: "256x256", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/images/yhopping_favicon_512px.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Yhopping — Optimización Financiera y Operativa para PyMEs",
    description:
      "Expertise CFO/COO 20+ años + Automatización + Enfoque práctico para PyMEs mexicanas.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-yhopping-gray-900">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
