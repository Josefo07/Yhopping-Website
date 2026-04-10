"use client";

import { useState } from "react";
import Link from "next/link";
import { posts, categories, type Category } from "@/lib/posts";
import { Calendar, ArrowRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  Operaciones: "#0046FF",
  Tecnología: "#1CC5DC",
  Liderazgo: "#27AE60",
  Finanzas: "#E67E22",
};

export default function InsightsPage() {
  const [active, setActive] = useState<Category>("Todos");

  const filtered = active === "Todos" ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="pt-36 pb-16 text-center"
        style={{
          background: "linear-gradient(160deg, rgba(0,70,255,0.92) 0%, rgba(28,197,220,0.85) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1
            className="font-heading font-black text-white mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 42px)", letterSpacing: "-0.02em" }}
          >
            Insights
          </h1>
          <p className="text-white/80 text-lg">
            Reflexiones sobre finanzas, operaciones y liderazgo desde la trinchera empresarial.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-yhopping-gray-200 sticky top-[72px] bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === cat
                    ? "text-white shadow-md scale-105"
                    : "bg-yhopping-gray-100 text-yhopping-gray-700 hover:bg-yhopping-gray-200"
                }`}
                style={
                  active === cat
                    ? { background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => {
              const color = categoryColors[post.category] ?? "#0046FF";
              return (
                <article
                  key={post.slug}
                  className="flex flex-col rounded-2xl border border-yhopping-gray-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >
                  {/* Color bar */}
                  <div className="h-1 w-full" style={{ background: color }} />

                  <div className="flex flex-col flex-1 p-7">
                    {/* Category + Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          background: `${color}15`,
                          color,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-yhopping-gray-700">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading font-bold text-lg text-yhopping-gray-900 mb-3 leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-yhopping-gray-700 leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Link */}
                    <Link
                      href={`/insights/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 group-hover:gap-3"
                      style={{ color }}
                    >
                      Leer más
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-yhopping-gray-700 py-16">
              No hay posts en esta categoría todavía.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
