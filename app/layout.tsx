import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
