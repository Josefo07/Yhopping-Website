"use client";

import type { Metadata } from "next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa?: string;
  mensaje: string;
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log("Contacto form data:", data);
    setSubmitted(true);
    reset();
  }

  if (submitted)
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
        <CheckCircle size={56} className="text-yhopping-green" />
        <h3 className="font-heading font-bold text-2xl text-yhopping-gray-900">
          ¡Gracias por escribirnos!
        </h3>
        <p className="text-yhopping-gray-700 max-w-sm">
          Te contactaremos en menos de 24 horas hábiles.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-semibold text-yhopping-cyan underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          {...register("nombre", { required: "El nombre es requerido" })}
          placeholder="Tu nombre completo"
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-yhopping-cyan/30 ${
            errors.nombre
              ? "border-red-400 bg-red-50"
              : "border-yhopping-gray-300 focus:border-yhopping-cyan"
          }`}
        />
        {errors.nombre && (
          <p className="mt-1 text-xs text-red-500">{errors.nombre.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email", {
            required: "El email es requerido",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
          })}
          type="email"
          placeholder="tu@empresa.com"
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-yhopping-cyan/30 ${
            errors.email
              ? "border-red-400 bg-red-50"
              : "border-yhopping-gray-300 focus:border-yhopping-cyan"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          {...register("telefono", {
            required: "El teléfono es requerido",
            pattern: {
              value: /^[\+]?[\d\s\-\(\)]{10,15}$/,
              message: "Incluye el código de país, ej. +52 55 1234 5678",
            },
          })}
          type="tel"
          placeholder="+52 55 1234 5678"
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-yhopping-cyan/30 ${
            errors.telefono
              ? "border-red-400 bg-red-50"
              : "border-yhopping-gray-300 focus:border-yhopping-cyan"
          }`}
        />
        {errors.telefono && (
          <p className="mt-1 text-xs text-red-500">{errors.telefono.message}</p>
        )}
      </div>

      {/* Empresa */}
      <div>
        <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
          Empresa <span className="text-yhopping-gray-700 font-normal">(opcional)</span>
        </label>
        <input
          {...register("empresa")}
          placeholder="Nombre de tu empresa"
          className="w-full border border-yhopping-gray-300 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-yhopping-cyan focus:ring-2 focus:ring-yhopping-cyan/30"
        />
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
          Mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("mensaje", {
            required: "El mensaje es requerido",
            minLength: { value: 20, message: "El mensaje debe tener al menos 20 caracteres" },
          })}
          rows={4}
          placeholder="¿En qué podemos ayudarte?"
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-yhopping-cyan/30 resize-none ${
            errors.mensaje
              ? "border-red-400 bg-red-50"
              : "border-yhopping-gray-300 focus:border-yhopping-cyan"
          }`}
        />
        {errors.mensaje && (
          <p className="mt-1 text-xs text-red-500">{errors.mensaje.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-full font-bold text-white text-base shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
      >
        {isSubmitting ? "Enviando…" : "Enviar Mensaje"}
      </button>
    </form>
  );
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="pt-36 pb-20"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,70,255,0.92) 0%, rgba(28,197,220,0.85) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="font-heading font-black text-white mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 42px)", letterSpacing: "-0.02em" }}
          >
            Hablemos
          </h1>
          <p className="text-white/80 text-lg">
            Primera consulta gratuita. Sin compromiso. Respondemos en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Form (65%) */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-yhopping-gray-200 bg-white p-8 shadow-sm">
                <h2 className="font-heading font-bold text-2xl text-yhopping-gray-900 mb-7">
                  Envíanos un mensaje
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar (35%) */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-yhopping-gray-50 border border-yhopping-gray-200 p-8 sticky top-24">
                <h3 className="font-heading font-bold text-lg text-yhopping-gray-900 mb-6">
                  Información de contacto
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a
                      href="mailto:atencionaclientes@yhopping.com"
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                        <Mail size={18} className="text-yhopping-cyan" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">Email</p>
                        <p className="text-sm text-yhopping-gray-700 group-hover:text-yhopping-blue transition-colors">
                          atencionaclientes@yhopping.com
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+525645358621" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                        <Phone size={18} className="text-yhopping-cyan" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">Teléfono</p>
                        <p className="text-sm text-yhopping-gray-700 group-hover:text-yhopping-blue transition-colors">
                          +52 56 4535 8621
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                      <MapPin size={18} className="text-yhopping-cyan" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">Ubicación</p>
                      <p className="text-sm text-yhopping-gray-700">Monterrey, Nuevo León</p>
                    </div>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/yhopping"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                        <LinkedinIcon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">LinkedIn</p>
                        <p className="text-sm text-yhopping-gray-700 group-hover:text-yhopping-blue transition-colors">
                          linkedin.com/company/yhopping
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-yhopping-gray-200">
                  <p className="text-xs text-yhopping-gray-700 leading-relaxed">
                    Respondemos todos los mensajes en menos de{" "}
                    <strong className="text-yhopping-gray-900">24 horas hábiles</strong>.
                    La primera consulta es <strong className="text-yhopping-green">completamente gratuita</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
