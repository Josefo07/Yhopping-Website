import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";
import { ArrowLeft, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post no encontrado — Yhopping" };
  return {
    title: `${post.title} — Yhopping Insights`,
    description: post.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  Operaciones: "#0046FF",
  Tecnología: "#1CC5DC",
  Liderazgo: "#27AE60",
  Finanzas: "#E67E22",
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const color = categoryColors[post.category] ?? "#0046FF";

  // Render content: convert double newlines to paragraphs, preserve emoji lines
  const paragraphs = post.content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="pt-36 pb-20"
        style={{
          background: "linear-gradient(160deg, rgba(0,70,255,0.92) 0%, rgba(28,197,220,0.85) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a Insights
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-xs">
              <Calendar size={12} />
              {post.date}
            </span>
          </div>

          <h1
            className="font-heading font-black text-white leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.02em" }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((para, i) => {
            // First paragraph = title (already shown in hero), skip it
            if (i === 0 && para === post.title) return null;

            // Detect list items
            if (para.startsWith("- ") || para.startsWith("✅") || para.startsWith("🔹") || para.startsWith("1️⃣") || para.startsWith("2️⃣")) {
              const lines = para.split("\n").filter(Boolean);
              return (
                <ul key={i} className="space-y-3 my-6 list-none pl-0">
                  {lines.map((line, j) => (
                    <li key={j} className="flex gap-2 text-yhopping-gray-700 leading-relaxed">
                      <span className="flex-shrink-0">{line.startsWith("- ") ? "→" : ""}</span>
                      <span>{line.startsWith("- ") ? line.slice(2) : line}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            // Detect sub-header (short bold lines)
            if (para.length < 80 && !para.includes(".")) {
              return (
                <h2
                  key={i}
                  className="font-heading font-bold text-2xl text-yhopping-gray-900 mt-10 mb-4"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {para}
                </h2>
              );
            }

            return (
              <p key={i} className="text-yhopping-gray-700 leading-relaxed mb-5 text-lg">
                {para}
              </p>
            );
          })}
        </div>

        {/* Divider + CTA */}
        <div className="mt-16 pt-10 border-t border-yhopping-gray-200">
          <p className="font-heading font-bold text-xl text-yhopping-gray-900 mb-6">
            ¿Quieres aplicar esto en tu empresa?
          </p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-white text-sm shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
          >
            Agenda tu Diagnóstico Gratuito →
          </Link>
        </div>

        {/* Back */}
        <Link
          href="/insights"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color }}
        >
          <ArrowLeft size={15} />
          Ver todos los insights
        </Link>
      </article>
    </div>
  );
}
