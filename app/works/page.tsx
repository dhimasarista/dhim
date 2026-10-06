"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaCode,
  FaPenNib,
  FaPalette,
  FaMobile,
} from "react-icons/fa";
import { CgBrowser } from "react-icons/cg";
import { Terminal, House, ArrowLeft, Cpu } from "lucide-react";

// 1. Data Projects (Retained all original projects and metadata)
const allProjects = [
  {
    id: 1,
    title: "MSONE",
    description: "Simple landing page with modern standard UI.",
    category: "Design",
    tags: ["React", "Shadcn/UI", "AstroJS"],
    year: "2025",
    links: { main: "https://msone.id", sec: null },
    featured: true,
    image: "/assets/image.png",
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
    image: "/assets/pdip.png",
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
    image: "/assets/natic.png",
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
    image: "/assets/kcl.png",
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
    image: "/assets/kings.png",
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
    image: "/assets/orkaine.png",
  },
  {
    id: 121,
    title: "Catopuma UI",
    description: "UI Template and Reference for Dashboard and Landing Page.",
    category: "Design",
    tags: ["React", "NextJS", "Shadcn/UI"],
    year: "2026",
    links: { main: "https://pdiperjuangankotabatam.com/", sec: null },
    featured: false,
    image: "/assets/catopuma.png",
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

const getTagColor = (tag: string) => {
  const mapping: Record<string, string> = {
    "C#": "text-pink-600 bg-pink-100 dark:bg-pink-950/60 dark:text-pink-400 border-pink-200 dark:border-pink-800",
    Rust: "text-orange-600 bg-orange-100/50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800",
    React: "text-cyan-600 bg-cyan-100/50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800",
    Java: "text-red-700 bg-red-100/50 dark:bg-red-950/60 border-red-200 dark:border-red-800",
    NextJS: "text-foreground bg-muted border-border",
    PostgreSQL: "text-blue-600 bg-blue-100/50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
    "Spring Boot": "text-emerald-600 bg-emerald-100/50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
    "Shadcn/UI": "text-purple-600 bg-purple-100/50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
    "Hyperledger Besu": "text-amber-700 bg-amber-100/50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
  };

  return mapping[tag] ?? "text-muted-foreground bg-muted/40 border-border";
};

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

  const categories = ["All", "General", "Application", "Design"];
  const filteredProjects =
    activeTab === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/20 selection:text-emerald-500">
      {/* Top Industrial Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md font-mono-code text-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-transparent -ml-2 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <House className="h-4 w-4 text-emerald-500" />
              <span className="font-semibold tracking-wide">HOME</span>
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM_ARCHIVES // ACTIVE
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-10 relative overflow-hidden bg-tech-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-4">
            <Badge
              variant="outline"
              className="rounded-none py-1 px-3 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 tracking-widest text-[10px] font-mono-code uppercase font-bold"
            >
              // SYSTEM_REGISTRY & PORTFOLIO
            </Badge>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              Selected <span className="text-emerald-500">Works</span>.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Curated web architectures, backend orchestration systems, and interactive software products engineered with clean constraints and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Projects List Section */}
      <section className="py-10 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-4 font-mono-code text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`
                  px-4 py-1.5 rounded text-xs font-semibold transition-all duration-200
                  ${
                    activeTab === cat
                      ? "bg-foreground text-background shadow-md scale-105"
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={project.id}
                >
                  <div className="h-full border border-border/80 rounded-xl bg-card hover:border-emerald-500/50 transition-all hover:shadow-xl flex flex-col group overflow-hidden corner-hud">
                    {/* Image Thumbnail */}
                    <div className="h-44 w-full relative overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold font-mono-code bg-background/90 backdrop-blur px-2 py-0.5 rounded border border-border/70 shadow-sm flex items-center gap-1.5">
                          {getCategoryIcon(project.category)} {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      {/* Meta */}
                      <div className="flex justify-between items-start font-mono-code text-xs text-muted-foreground">
                        <span className="text-emerald-500 font-semibold">// {project.year}</span>
                      </div>

                      {/* Content */}
                      <div className="space-y-2 flex-grow">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-emerald-500 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tags & Action Link */}
                      <div className="pt-4 border-t border-border/60 flex flex-col gap-3 font-mono-code text-xs">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-end pt-1">
                          <a
                            href={project.links.main || project.links.sec || "#"}
                            target={project.links.main !== "#" ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1.5 hover:text-emerald-500 font-semibold transition-colors"
                          >
                            <span>EXPLORE ARCHIVE</span>
                            <FaExternalLinkAlt className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-muted-foreground font-mono-code">
              <p>-- No projects found matching category --</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/80 py-12 bg-background/80 font-mono-code text-xs text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-2 text-muted-foreground">
          <p className="text-foreground font-semibold">
            &lt; DHIMASARISTA /&gt; © 2045 BATAM, RIAU ISLANDS
          </p>
          <p>ENGINEERED FOR SCALE, DETERMINISM & RESILIENCE</p>
        </div>
      </footer>
    </div>
  );
}
