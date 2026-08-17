import { promises as fs } from "fs";
import path from "path";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: number;
  tags: string[];
  content: string[];
};

const blogDataPath = path.join(process.cwd(), "public", "blog-posts.json");

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const fileContents = await fs.readFile(blogDataPath, "utf8");
  const posts = JSON.parse(fileContents) as BlogPost[];

  return posts.sort((firstPost, secondPost) =>
    secondPost.date.localeCompare(firstPost.date),
  );
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getAllBlogPosts();

  return posts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
