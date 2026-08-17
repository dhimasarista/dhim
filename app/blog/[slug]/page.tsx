import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { FaArrowLeft, FaClock, FaEye } from "react-icons/fa";
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

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
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-6 md:px-12">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <FaArrowLeft className="mr-2 h-4 w-4" />
              BACK TO BLOG
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <article className="py-20">
        <div className="max-w-4xl mx-auto space-y-10 px-6 md:px-12">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-sm tracking-widest text-muted-foreground">
                // ARTICLE
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {post.title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span>{formatBlogDate(post.date)}</span>
              <span className="flex items-center gap-2">
                <FaClock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <FaEye className="h-3.5 w-3.5" />
                {post.views.toLocaleString()} views
              </span>
            </div>
          </header>

          <Separator />

          <div className="space-y-6 text-base leading-8 text-muted-foreground">
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
