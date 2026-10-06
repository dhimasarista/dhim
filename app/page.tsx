"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { IIoTArchitectureBackground } from "@/components/iiot-architecture-background";
import { IIoTTerminalDrawer } from "@/components/iiot-terminal-drawer";
import { ArchitectureShowcase } from "@/components/architecture-showcase";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import {
  Terminal,
  Activity,
  Layers,
  Cpu,
  ArrowRight,
  FolderGit2,
  BookOpen,
  Building2,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      icon: <FaGithub className="w-4 h-4" />,
      url: "https://github.com/dhimasarista",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-4 h-4" />,
      url: "https://linkedin.com/in/dhimasarista",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter className="w-4 h-4" />,
      url: "https://twitter.com/dhimasarista22",
      label: "Twitter",
    },
    {
      icon: <FaInstagram className="w-4 h-4" />,
      url: "https://instagram.com/dhimasarista",
      label: "Instagram",
    },
    {
      icon: <FaWhatsapp className="w-4 h-4" />,
      url: "https://wa.me/6285157248841",
      label: "WhatsApp",
    },
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      url: "mailto:mdhimasarista@gmail.com",
      label: "Email",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-emerald-500/20 selection:text-emerald-500">
      {/* --- TOP INDUSTRIAL HUD BAR --- */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between font-mono-code text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold tracking-wider text-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              DHIMAS_NODE // BATAM
            </span>
            <span className="text-muted-foreground hidden sm:inline">|</span>
            <span className="text-muted-foreground hidden sm:inline text-[11px]">
              PROTOCOL: ZMQ/WSS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <Link
                href="/works"
                className="px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded transition-colors"
              >
                WORKS
              </Link>
              <Link
                href="/blog"
                className="px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded transition-colors"
              >
                LOGS
              </Link>
            </nav>
            <Separator orientation="vertical" className="h-4" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* --- HERO SECTION WITH INTERACTIVE IIoT SYSTEM FLOW BACKGROUND --- */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 md:px-12 lg:px-20 py-16 overflow-hidden">
        {/* Animated Architecture & Packet Flow Background */}
        <IIoTArchitectureBackground />

        {/* Foreground Content Card with Technical HUD styling */}
        <div className="max-w-5xl w-full mx-auto relative z-10 space-y-8">
          
          {/* Main Profile Info Box */}
          <div className="p-6 md:p-10 rounded-2xl border border-border/80 bg-background/70 dark:bg-slate-950/75 backdrop-blur-xl shadow-2xl corner-hud space-y-8">
            
            {/* Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono-code text-xs border-b border-border/60 pb-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  SYS_ONLINE
                </span>
                <span>CLUSTER: BATAM_01</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">EDGE TELEMETRY INGESTION ACTIVE</span>
              </div>
              <div className="text-[11px] font-mono-code">
                PORT: <span className="text-foreground">tcp://*:5555</span>
              </div>
            </div>

            {/* Avatar, Identity and Title */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar with cyber/industrial border */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-60 blur group-hover:opacity-100 transition duration-500" />
                <img
                  src="https://avatars.githubusercontent.com/u/74050710?v=4"
                  alt="Dhimas Arista Avatar"
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-background shadow-xl"
                />
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-background shadow-sm animate-pulse" />
              </div>

              {/* Text info */}
              <div className="space-y-2 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-muted/60 text-muted-foreground text-xs font-mono-code">
                  <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                  <span>C# .NET • REACT • DISTRIBUTED SYSTEMS</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                  DHIMAS ARISTA
                </h1>

                <p className="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 font-mono-code tracking-wide">
                  SOFTWARE & INDUSTRIAL IoT ENGINEER
                </p>

                <p className="text-sm text-muted-foreground max-w-2xl pt-1">
                  Crafting high-throughput industrial telemetry pipelines, deterministic C# backend engines, and real-time operator interfaces in Batam, Riau Islands.
                </p>
              </div>
            </div>

            {/* Industry Roles & Affiliations */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://epbox-engg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/80 bg-muted/40 hover:bg-muted/80 hover:border-emerald-500/50 text-xs font-mono-code text-foreground transition-all group"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>IT @ EPBOX ENGINEERING PTE LTD</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
              </a>

              <a
                href="https://msone.id/teams"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/80 bg-muted/40 hover:bg-muted/80 hover:border-cyan-500/50 text-xs font-mono-code text-foreground transition-all group"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                <span>TEAM @ MSONE</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
              </a>
            </div>

            {/* Quote Block with Industrial styling */}
            <div className="border-l-2 border-emerald-500/80 bg-muted/20 pl-4 py-2 text-sm text-muted-foreground font-mono-code">
              ⛩️ Tooi michi no rimo ippo kara hajimaru /{" "}
              <span className="font-bold text-foreground">
                A long journey begins with a single step.
              </span>
            </div>

            {/* Technology Badges Matrix */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono-code text-muted-foreground uppercase tracking-widest">
                // SYSTEM_STACK & RUNTIME_BADGES
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <img
                  src="https://custom-icon-badges.demolab.com/badge/CSharp-EC4899?logo=cshrp&logoColor=white&style=flat-square"
                  alt="C#"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square"
                  alt="React"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://custom-icon-badges.demolab.com/badge/Coffee-F3F4F6?logo=lucide-coffee&logoColor=white&style=flat-square"
                  alt="Coffee"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white&style=flat-square"
                  alt="PostgreSQL"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/DragonflyDB-E03C31?style=flat-square&logo=redis&logoColor=white"
                  alt="DragonflyDB"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://custom-icon-badges.demolab.com/badge/ZeroMQ-F3F4F6?logo=zeromq&logoColor=white&style=flat-square"
                  alt="ZeroMQ"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://custom-icon-badges.demolab.com/badge/Websocket-262626?logo=websocket&logoColor=white&style=flat-square"
                  alt="WebSocket"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/Podman-892CA0?logo=podman&logoColor=white&style=flat-square"
                  alt="Podman"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white&style=flat-square"
                  alt="Kubernetes"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/Debian-A81D33?logo=debian&logoColor=white&style=flat-square"
                  alt="Debian"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/Grafana-F46800?logo=grafana&logoColor=white&style=flat-square"
                  alt="Grafana"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white&style=flat-square"
                  alt="Nginx"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/Nomad-262626?logo=hashicorp&logoColor=white&style=flat-square"
                  alt="Nomad"
                  className="rounded-sm shadow-sm"
                />
                <img
                  src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white"
                  alt="Jenkins"
                  className="rounded-sm shadow-sm"
                />
              </div>
            </div>

            <Separator className="bg-border/60" />

            {/* CTAs and Social Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Main Action Navigation Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono-code shadow-md">
                  <Link href="/works">
                    <FolderGit2 className="w-4 h-4" />
                    <span>EXPLORE WORKS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 font-mono-code border-border/80">
                  <Link href="/blog">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    <span>ENGINEERING LOGS</span>
                  </Link>
                </Button>
              </div>

              {/* Social Channels Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    asChild
                    className="h-10 w-10 border-border/80 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE ARCHITECTURE & DATA FLOW PIPELINE SHOWCASE --- */}
      <ArchitectureShowcase />

      {/* --- LIVE TELEMETRY LOGS DRAWER WIDGET --- */}
      <IIoTTerminalDrawer />

      {/* --- FOOTER --- */}
      <footer className="border-t border-border/80 py-12 bg-background/80 font-mono-code">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-3">
          <p className="text-sm text-foreground font-semibold">
            &lt; DHIMASARISTA /&gt; © 2045 BATAM, RIAU ISLANDS
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span>IIoT & DISTRIBUTED SYSTEMS</span>
            <span>•</span>
            <span>C# .NET & REACT</span>
            <span>•</span>
            <span>ZEROMQ & MODBUS TCP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}