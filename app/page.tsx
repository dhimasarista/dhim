"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"; // Uncomment jika Badge digunakan kembali
import { Separator } from "@/components/ui/separator";
import { CityAnimation } from "@/components/city-animation";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
// import { GiServerRack } from "react-icons/gi"; // Uncomment jika GiServerRack digunakan kembali

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      url: "https://github.com/dhimasarista",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/dhimasarista",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      url: "https://twitter.com/dhimasarista22",
      label: "Twitter",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: "https://instagram.com/dhimasarista",
      label: "Instagram",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      url: "https://wa.me/6285157248841",
      label: "WhatsApp",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      url: "mailto:mdhimasarista@gmail.com",
      label: "Email",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      {/* Hero Section with City Animation */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 relative overflow-hidden">
        {/* City Animation Background */}
        <CityAnimation />

        {/* Content */}
        <div className="max-w-6xl w-full mx-auto space-y-8 relative z-10">
          
          {/* Avatar, Name and Title (Sejajar/Flex) */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Ganti src dengan path fotomu nanti, misal: "/images/profile.jpg" */}
            <img 
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/730d7fd6-7732-47f1-8bb2-c22fbeae272e/deombqn-102afb4a-3683-4dc6-a0ab-9eb7d00e64ed.jpg/v1/fill/w_1063,h_752,q_70,strp/earthbender_avatars_by_moptop4000_deombqn-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTA2IiwicGF0aCI6Ii9mLzczMGQ3ZmQ2LTc3MzItNDdmMS04YmIyLWMyMmZiZWFlMjcyZS9kZW9tYnFuLTEwMmFmYjRhLTM2ODMtNGRjNi1hMGFiLTllYjdkMDBlNjRlZC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.-Lf8GEm28YZqSWTfWAvTLDl0Tg2UfBMGkJXrs8-1dp8" 
              alt="Dhimas Arista Avatar" 
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-border shadow-sm shrink-0"
            />
            
            {/* Wrapper khusus untuk teks agar tetap atas-bawah */}
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight no-glow bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  DHIMASARISTA
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground tracking-wide">
                C# RUST & REACT | PROGRAMMER
              </p>
            </div>
          </div>

          {/* Work Status Tags - Rectangular with Blur */}
          {/* <div className="flex flex-wrap gap-3">
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm rounded-none backdrop-blur-md bg-background/50"
            >
              <a
                href="https://epbox-engg.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                IT @ EPBOX ENGINEERING PTE LTD
              </a>
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm rounded-none backdrop-blur-md bg-background/50"
            >
              <a
                href="https://msone.id/teams"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                TEAM @ MSONE
              </a>
            </Badge>
          </div> */}

          <Separator className="my-8" />

          <div className="space-y-6 max-w-3xl">
            {/*
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              <span className="text-foreground font-medium">
                Measure before you move, Learn through feedback.{" "}
              </span>{" "}
              Stay constraint-aware, Think Analytically.
            </p>
            */}

            <blockquote className="border-l-2 border-border pl-6 text-muted-foreground">
              ⛩️ Tooi michi no rimo ippo kara hajimaru / <span className="font-bold">A long journey begins with a single step.</span>
            </blockquote>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <img
                src="https://custom-icon-badges.demolab.com/badge/CSharp-EC4899?logo=cshrp&logoColor=white&style=flat-square"
                alt="C#"
              />
              <img
                src="https://img.shields.io/badge/Rust-262626?logo=rust&logoColor=white&style=flat-square"
                alt="Rust"
              />
              <img
                src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square"
                alt="React"
              />
              <img
                src="https://custom-icon-badges.demolab.com/badge/Null-F3F4F6?logo=lucide-coffee&logoColor=white&style=flat-square"
                alt="Null"
              />
              <img
                src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white&style=flat-square"
                alt="PostgreSQL"
              />
              <img
                src="https://img.shields.io/badge/DragonflyDB-E03C31?style=flat-square&logo=redis&logoColor=white"
                alt="DragonflyDB"
              />

              <img
                src="https://custom-icon-badges.demolab.com/badge/ZeroMQ-F3F4F6?logo=zeromq&logoColor=white&style=flat-square"
                alt="ZeroMQ"
              />
              <img
                src="https://custom-icon-badges.demolab.com/badge/Websocket-262626?logo=websocket&logoColor=white&style=flat-square"
                alt="WebSocket"
              />

              <img
                src="https://img.shields.io/badge/Podman-892CA0?logo=podman&logoColor=white&style=flat-square"
                alt="Podman"
              />
              <img
                src="https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white&style=flat-square"
                alt="Kubernetes"
              />

              <img
                src="https://img.shields.io/badge/Debian-A81D33?logo=debian&logoColor=white&style=flat-square"
                alt="Debian"
              />
              <img
                src="https://img.shields.io/badge/Grafana-F46800?logo=grafana&logoColor=white&style=flat-square"
                alt="Grafana"
              />
              <img
                src="https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white&style=flat-square"
                alt="Nginx"
              />
              <img
                src="https://img.shields.io/badge/Nomad-262626?logo=hashicorp&logoColor=white&style=flat-square"
                alt="Nomad"
              />
              <img
                src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white"
                alt="Jenkins"
              />
            </div>
          </div>

          <Separator className="my-8" />

          {/* Social Links + CTA - Inline */}
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                asChild
                className="h-12 w-12"
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

            {/* Separator between social and blog button */}
            <div className="h-8 w-px bg-border mx-2" />

            {/* Buttons */}
            {/* <Button asChild size="lg" className="gap-2">
              <Link href="/works">
                <GiServerRack className="w-4 h-4" />
              </Link>
            </Button> */}
            <Button asChild size="lg" className="gap-2">
              <Link href="/blog">
                <IoNewspaperOutline className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Miro Skillset Embed Section */}
      {/* <section className="px-6 md:px-12 lg:px-20 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-sm text-muted-foreground tracking-widest mb-4">
              // SKILL_MAP
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              INTERACTIVE SKILLSET
            </h2>
          </div>

          <div className="border rounded-none p-1 bg-background">
            <iframe
              width="100%"
              height="496"
              src="https://miro.com/app/live-embed/uXjVI_FQdSQ=/?focusWidget=3458764651897494116&embedMode=view_only_without_ui&embedId=86926895146"
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
              className="block"
            />
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            &lt; DHIMASARISTA /&gt; © 2045 BATAM, RIAU ISLAND
          </p>
          <p className="text-xs text-muted-foreground">BUILT WITH ⚛ REACT</p>
        </div>
      </footer>
    </div>
  );
}