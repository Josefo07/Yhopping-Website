"use client";
import Link from "next/link";
import {useLanguage} from "@/lib/i18n/LanguageContext";
export default function AcademiaPage(){const {lang}=useLanguage();const en=lang==="en";return <section className="max-w-3xl mx-auto px-6 pt-36 pb-24"><h1 className="text-4xl font-bold mb-6">Yhopping Academia</h1><p className="text-lg mb-6">{en?"Registration is not currently open. We have not confirmed dates or places for this program.":"Las inscripciones no están abiertas. No hay fechas ni lugares confirmados para este programa."}</p><Link className="underline" href="/contacto">{en?"Ask about future programs":"Consultar sobre próximos programas"}</Link></section>;}
