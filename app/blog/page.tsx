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
import { House } from "lucide-react";

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
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6 md:px-12 lg:px-20">
          <Button variant="outline" asChild>
            <Link href="/">
              <House className="mr-2 h-4 w-4" />
              HOME
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <p className="text-sm tracking-wider text-muted-foreground">MODE</p>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">
            // THOUGHTS_AND_EXPERIMENTS
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            THE TERMINAL
          </h1>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-base text-muted-foreground">
              Notes, tutorials, and thoughts on software engineering, systems
              programming, and the craft of building things.
            </p>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{startIndex + paginatedPosts.length} of{" "}
              {posts.length} posts
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto space-y-10 px-6 md:px-12 lg:px-20">
          <div className="grid gap-6 md:grid-cols-2">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold leading-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Separator />
                    <div className="flex w-full flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                          <FaClock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye className="h-3 w-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                      <span>{formatBlogDate(post.date)}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-3">
              {currentPage > 1 ? (
                <Button variant="outline" asChild>
                  <Link
                    href={
                      currentPage - 1 === 1
                        ? "/blog"
                        : `/blog?page=${currentPage - 1}`
                    }
                  >
                    <FaChevronLeft className="mr-2 h-3.5 w-3.5" />
                    Previous
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <FaChevronLeft className="mr-2 h-3.5 w-3.5" />
                  Previous
                </Button>
              )}

              {currentPage < totalPages ? (
                <Button variant="outline" asChild>
                  <Link href={`/blog?page=${currentPage + 1}`}>
                    Next
                    <FaChevronRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  Next
                  <FaChevronRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="max-w-4xl mx-auto space-y-4 px-6 text-center">
          <Separator className="mb-6" />
          <p className="text-sm text-muted-foreground">
            &lt; DHIMAS.ARISTA /&gt; © 2024 — THE TERMINAL
          </p>
        </div>
      </footer>
    </div>
  );
}
