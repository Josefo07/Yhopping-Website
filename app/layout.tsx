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
  metadataBase: new URL("https://yhopping.com"),
  title: "Yhopping — Dirección Financiera y Operativa Fraccional para PyMEs",
  description:
    "Estabilizamos tu operación y maximizamos tu rentabilidad. CFO & COO Fraccional para PyMEs mexicanas ($10M–$100M MXN). Flujo de caja, diagnóstico financiero, automatización Office 365. Monterrey NL.",
  keywords: [
    "CFO fraccional México",
    "COO fraccional",
    "dirección financiera PyMEs",
    "optimización financiera",
    "PyMEs México",
    "flujo de caja",
    "automatización Office 365",
    "diagnóstico financiero empresarial",
    "consultoría empresarial Monterrey",
    "Yhopping",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/yh-favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/yh-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/yh-favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/images/yh-apple-180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/images/yh-android-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/images/yh-android-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Yhopping — Dirección Financiera y Operativa Fraccional para PyMEs",
    description:
      "Estabilizamos tu operación y maximizamos tu rentabilidad. CFO & COO Fraccional · PyMES Mexicanas · Monterrey NL.",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/images/yh-og-image.png",
        width: 1200,
        height: 630,
        alt: "Yhopping — Potenciando Empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yhopping — Dirección Financiera y Operativa Fraccional",
    description: "CFO & COO Fraccional para PyMEs mexicanas. Rigor sin rigidez.",
    images: ["/images/yh-og-image.png"],
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
