import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { FaClock, FaEye } from "react-icons/fa";
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { ArrowLeft, Terminal } from "lucide-react";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/20 selection:text-emerald-500">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md font-mono-code text-xs">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6 md:px-12">
          <Button variant="ghost" size="sm" asChild className="-ml-2 hover:bg-transparent text-muted-foreground hover:text-foreground">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 text-emerald-500" />
              <span>RETURN TO LOGS</span>
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
              LOG_ID: {slug.slice(0, 14)}...
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <article className="py-16">
        <div className="max-w-4xl mx-auto space-y-10 px-6 md:px-12">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-2 font-mono-code">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-xs tracking-widest text-emerald-600 dark:text-emerald-400 font-mono-code font-bold">
                // TECHNICAL_ARTICLE & ARCHITECTURE
              </p>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                {post.title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground font-mono-code text-sm">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono-code text-muted-foreground border-y border-border/70 py-3">
              <span className="text-foreground font-medium">{formatBlogDate(post.date)}</span>
              <span className="flex items-center gap-1.5">
                <FaClock className="h-3 w-3 text-emerald-500" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <FaEye className="h-3 w-3" />
                {post.views.toLocaleString()} views
              </span>
            </div>
          </header>

          <div className="space-y-6 text-base leading-8 text-foreground/90 font-sans">
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-${index}`} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <Separator className="bg-border/60" />

          {/* Bottom Back Button */}
          <div className="pt-4 font-mono-code">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO ALL LOGS
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <footer className="border-t border-border/80 py-12 bg-background/80 font-mono-code text-xs text-center">
        <div className="max-w-4xl mx-auto space-y-2 text-muted-foreground">
          <p className="text-foreground font-semibold">
            &lt; DHIMASARISTA /&gt; © 2045 BATAM, RIAU ISLANDS
          </p>
          <p>ENGINEERING LOGS & DISTRIBUTED SYSTEMS ARCHITECTURE</p>
        </div>
      </footer>
    </div>
  );
}
