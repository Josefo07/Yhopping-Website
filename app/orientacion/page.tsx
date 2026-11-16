import type { Metadata } from "next";
import Orientation from "@/components/orientation/Orientation";
export const metadata: Metadata = {
 title: "Orientación Ejecutiva Empresarial — Yhopping",
 description: "Practica decisiones de liderazgo, comunicación y gestión. Explora un caso de delegación y prepara una acción con criterios claros.",
 alternates: {canonical: "/orientacion"}
};
export default function Page(){return <Orientation/>;}
