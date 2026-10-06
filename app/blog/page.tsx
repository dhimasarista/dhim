import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaEye,
} from "react-icons/fa";
import { formatBlogDate, getAllBlogPosts } from "@/lib/blog";
import { House, Terminal, ArrowRight } from "lucide-react";

const POSTS_PER_PAGE = 8;

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number(resolvedSearchParams?.page ?? "1");
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const posts = await getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  if (currentPage > totalPages) {
    notFound();
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/20 selection:text-emerald-500">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md font-mono-code text-xs">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6 md:px-12 lg:px-20">
          <Button variant="ghost" size="sm" asChild className="-ml-2 hover:bg-transparent text-muted-foreground hover:text-foreground">
            <Link href="/" className="flex items-center gap-2">
              <House className="h-4 w-4 text-emerald-500" />
              <span className="font-semibold tracking-wide">HOME</span>
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LOG_FEED: LIVE
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-tech-grid">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 space-y-4">
          <Badge
            variant="outline"
            className="rounded-none py-1 px-3 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 tracking-widest text-[10px] font-mono-code uppercase font-bold"
          >
            // ARCHITECTURE_NOTES & TERMINAL
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground font-mono-code">
            THE TERMINAL.
          </h1>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between font-mono-code text-xs text-muted-foreground">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground font-sans">
              Notes, distributed patterns, and thoughts on software engineering, systems
              programming, and the craft of reliable architectures.
            </p>
            <p className="shrink-0">
              Showing {startIndex + 1}-{startIndex + paginatedPosts.length} of{" "}
              {posts.length} entries
            </p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="pb-20 pt-4">
        <div className="max-w-6xl mx-auto space-y-10 px-6 md:px-12 lg:px-20">
          <div className="grid gap-6 md:grid-cols-2">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <Card className="h-full border-border/80 bg-card hover:border-emerald-500/50 transition-all hover:shadow-xl corner-hud flex flex-col">
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex flex-wrap gap-1.5 font-mono-code">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold leading-tight text-foreground group-hover:text-emerald-500 transition-colors">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="flex-1 pb-4">
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 pt-0">
                    <Separator className="bg-border/60" />
                    <div className="flex w-full flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-muted-foreground">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1.5">
                          <FaClock className="h-3 w-3 text-emerald-500" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaEye className="h-3 w-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-foreground/80">{formatBlogDate(post.date)}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-border/80 pt-6 md:flex-row md:items-center md:justify-between font-mono-code text-xs">
            <p className="text-muted-foreground">
              PAGE {currentPage} OF {totalPages}
            </p>
            <div className="flex gap-3">
              {currentPage > 1 ? (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={
                      currentPage - 1 === 1
                        ? "/blog"
                        : `/blog?page=${currentPage - 1}`
                    }
                  >
                    <FaChevronLeft className="mr-1.5 h-3 w-3" />
                    PREVIOUS
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  <FaChevronLeft className="mr-1.5 h-3 w-3" />
                  PREVIOUS
                </Button>
              )}

              {currentPage < totalPages ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog?page=${currentPage + 1}`}>
                    NEXT
                    <FaChevronRight className="ml-1.5 h-3 w-3" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  NEXT
                  <FaChevronRight className="ml-1.5 h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
