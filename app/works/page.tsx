"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaCode,
  FaPenNib,
  FaPalette,
  FaCamera,
  FaMobile,
} from "react-icons/fa";
import { CgBrowser } from "react-icons/cg";
import { House } from "lucide-react";

// 1. Data Projects (Lorem Content + Professional Tags + Image Links)
const allProjects = [
  {
    id: 1,
    title: "MSONE",
    description: "Simple landing page with modern standard UI.",
    category: "Design", // Profesional
    tags: ["React", "Shadcn/UI", "AstroJS"], // Profesional
    year: "2025",
    links: { main: "https://msone.id", sec: null },
    featured: true,
    image: "./assets/image.png",
  },
  {
    id: 4,
    title: "DPC PDIP Kota Batam",
    description: "Landing Page and Dashboard for Political Party",
    category: "Application",
    tags: ["NextJS", "NestJS", "PostgreSQL", "SocketIO"],
    year: "2025",
    links: { main: "https://pdiperjuangankotabatam.com/", sec: null },
    featured: false,
    image: "./assets/pdip.png",
  },

  {
    id: 7,
    title: "Nao Natic UI",
    description: "Modern and futuristic UI Design for Landing Page",
    category: "Design",
    tags: ["React", "Shadcn/UI", "AstroJS"],
    year: "2026",
    links: { main: "https://natic.archmage.me", sec: null },
    featured: true,
    image: "./assets/natic.png",
  },
  {
    id: 12,
    title: "KESWARA CITRA LOGISTIC",
    description: "Website for logistics Company",
    category: "Design",
    tags: ["React", "NextJS", "Shadcn/UI"],
    year: "2026",
    links: { main: "https://kcl.msone.id", sec: null },
    featured: false,
    image: "./assets/kcl.png",
  },
  {
    id: 11,
    title: "KINGS GLOBAL NUSANTARA",
    description: "Web with Content Management System",
    category: "Application",
    tags: ["NextJS", "Prisma", "SQL"],
    year: "2026",
    links: { main: "#", sec: null },
    featured: false,
    image: "./assets/kings.png",
  },
  {
    id: 10,
    title: "Orkaine Project",
    description: "An platform for payment orchestration and automation.",
    category: "Application",
    tags: ["C#", "NextJS", "PostgreSQL"],
    year: "2026",
    links: { main: "https://pdiperjuangankotabatam.com/", sec: null },
    featured: false,
    image: "./assets/orkaine.png",
  },
  {
    id: 12,
    title: "Catopuma UI",
    description: "UI Template and Reference for Dashboard and Landing Page.",
    category: "Design",
    tags: ["React", "NextJS", "Shadcn/UI"],
    year: "2026",
    links: { main: "https://pdiperjuangankotabatam.com/", sec: null },
    featured: false,
    image: "./assets/catopuma.png",
  },
  {
    id: 3,
    title: "Building a Java-Based Enterprise Blockchain Stack",
    description:
      "An enterprise-grade blockchain initiative built on a full Java ecosystem, focusing on architecture design, system integration, and operational reliability. The project leverages Hyperledger Besu as the core blockchain layer, with Spring Boot–based services handling domain logic, governance workflows, and enterprise integration.",
    category: "General",
    tags: ["Java", "Hyperledger Besu", "Spring Boot"],
    year: "2026",
    links: { main: "#", sec: null },
    featured: false,
    image:
      "https://besu.hyperledger.org/assets/images/public-architecture-f5c7eccbe91313bd2b626b2ad1ced0ca.jpeg",
  },
];

// 2. Helper untuk warna tags (Profesional Look)
const getTagColor = (tag: string) => {
  const mapping: Record<string, string> = {
    // Languages
    "C#": "text-pink-600 bg-pink-100 dark:bg-pink-900/40 dark:text-pink-400 border-pink-200",
    Rust: "text-orange-600 bg-orange-100/50 dark:bg-orange-900/30 border-orange-200",
    React: "text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 border-blue-200",
    "React Native":
      "text-blue-500 bg-blue-200 dark:bg-blue-900/30 border-blue-200",
    Java: "text-red-800 bg-red-100/50 dark:bg-red-900/30 border-red-200",
    NodeJS:
      "text-green-600 bg-green-100/50 dark:bg-green-900/30 border-green-200",
    NestJS: "text-red-600 bg-red-100/50 dark:bg-red-900/30 border-red-200",
    TypeScript:
      "text-blue-600 bg-blue-100/50 dark:bg-blue-900/30 border-blue-200",
    PostgreSQL:
      "text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 border-blue-200",
    // Frameworks
    NextJS:
      "text-neutral-100 bg-neutral-600 dark:bg-neutral-800/60 border-neutral-300",
    "Spring Boot":
      "text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-200",
    "Shadcn/UI":
      "text-purple-600 bg-purple-100/50 dark:bg-purple-900/30 border-purple-200",
    Svelte:
      "text-orange-600 bg-orange-100/50 dark:bg-orange-900/30 border-orange-200",
    // Blockchain
    Blockchain:
      "text-yellow-700 bg-yellow-100/50 dark:bg-yellow-900/30 border-yellow-200",
    "Hyperledger Besu":
      "text-amber-700 bg-amber-100/50 dark:bg-amber-900/30 border-amber-200",

    // Research
    "Systems Thinking":
      "text-indigo-600 bg-indigo-100/50 dark:bg-indigo-900/30 border-indigo-200",
    "Urban Planning":
      "text-sky-600 bg-sky-100/50 dark:bg-sky-900/30 border-sky-200",
    Android: "text-teal-600 bg-teal-100/50 dark:bg-teal-900/30 border-teal-200",
  };

  return mapping[tag] ?? "text-muted-foreground bg-muted/40 border-border";
};

// 3. Helper Icons
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "General":
      return <CgBrowser className="w-3 h-3" />;
    case "Application":
      return <FaCode className="w-3 h-3" />;
    case "Design":
      return <FaPalette className="w-3 h-3" />;
    case "Mobile Apps":
      return <FaMobile className="w-3 h-3" />;
    case "Writing":
      return <FaPenNib className="w-3 h-3" />;
    default:
      return <FaLayerGroup className="w-3 h-3" />;
  }
};

export default function GeneralWorks() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter Logic
  const categories = ["All", "General", "Application", "Design", "Writing"];
  const filteredProjects =
    activeTab === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeTab);

  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            className="pl-0 hover:bg-transparent -ml-2"
            asChild
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <House className="h-4 w-4" />
              <span className="font-medium tracking-wide">HOME</span>
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            {/* <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold tracking-wider border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded h-2 w-2 bg-green-500"></span>
              </span>
              LET’S COLLABORATE ON MEANINGFUL WORKS
            </span> */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-20 pb-12 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-6">
            <Badge
              variant="outline"
              className="rounded-none py-1.5 px-3 border-primary/20 text-primary bg-primary/5 tracking-widest text-[10px] font-mono uppercase"
            >
              // WORKS
            </Badge>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              Selected <span className="text-red-600">Works</span>.{" "}
              <br className="hidden md:block" />
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse.
            </p>
          </div>
        </div>
      </section>

      {/* --- FEATURED CARDS (Highlight) --- */}
      {/* <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden border-border/60 bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 rounded-xl"
              >
                <div className="h-64 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                    <div className="bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-md border shadow-sm">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground">
                        {getCategoryIcon(project.category)}
                        {project.category}
                      </div>
                    </div>
                    <span className="text-white font-mono text-xs font-medium bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-2 pt-6">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </CardHeader>

                <CardContent className="space-y-4 pb-4">
                  <p className="text-muted-foreground leading-relaxed line-clamp-2 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-medium px-2 py-1 rounded-md border ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 pb-6">
                  <div className="flex gap-4">
                    {project.links.main && (
                      <Link
                        href={project.links.main}
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                      >
                        View Project <FaExternalLinkAlt className="w-3 h-3" />
                      </Link>
                    )}
                    {project.links.sec && (
                      <Link
                        href={project.links.sec}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FaGithub className="w-4 h-4" /> Source
                      </Link>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* --- FILTER & LIST SECTION --- */}
      <section className="py-12 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b pb-4 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    activeTab === cat
                      ? "bg-foreground text-background shadow-lg scale-105"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={project.id}
                >
                  <div className="h-full border rounded-xl bg-background hover:border-primary/40 transition-all hover:shadow-lg flex flex-col group overflow-hidden">
                    {/* Image Thumbnail for Grid Items */}
                    <div className="h-40 w-full relative overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold bg-background/80 backdrop-blur px-2 py-1 rounded border shadow-sm flex items-center gap-1">
                          {getCategoryIcon(project.category)} {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Top Meta */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs text-muted-foreground font-mono">
                          {project.year}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Footer / Tags */}
                      <div className="mt-auto pt-4 border-t border-dashed border-border/60 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className={`text-[10px] font-medium px-2 py-1 rounded-md border ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-muted-foreground">
                              +more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={
                              project.links.main || project.links.sec || "#"
                            }
                            className="text-xs flex items-center gap-1 hover:underline hover:text-primary font-medium"
                          >
                            View Details{" "}
                            <FaExternalLinkAlt className="w-2 h-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t py-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Dhimas Arista. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
