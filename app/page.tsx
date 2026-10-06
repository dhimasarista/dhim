"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.documentElement.dataset.entered) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.remove("js-enter");
      return;
    }

    document.documentElement.dataset.entered = "true";

    const isSmall = window.matchMedia("(max-width: 648px)").matches;
    const d = isSmall ? 0.62 : 1;
    const t = isSmall ? 0.85 : 1;

    const EXPO = "cubic-bezier(.16,1,.3,1)";
    const SOFT = "cubic-bezier(.22,.65,.28,1)";
    const SETTLE = "cubic-bezier(.33,1,.68,1)";

    const animations: Animation[] = [];

    const anim = (
      selector: string,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions
    ) => {
      const el = document.querySelector<HTMLElement>(selector);
      if (!el) return null;
      const a = el.animate(keyframes, options);
      animations.push(a);
      return a;
    };

    // 1. eyebrow: rise 12px, 560ms, delay 60, SOFT
    anim(
      ".nx-eyebrow",
      [
        { opacity: 0, transform: `translate3d(0, ${12 * d}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 560, delay: 60 * t, easing: SOFT, fill: "forwards" }
    );

    // 2. headline: 118% → 0, 950ms, delay 170, EXPO
    anim(
      ".nx-headline",
      [
        { transform: "translate3d(0, 118%, 0)" },
        { transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 950, delay: 170 * t, easing: EXPO, fill: "forwards" }
    );

    // 3. lede: rise 14px, 660ms, delay 430, SOFT
    anim(
      ".nx-lede",
      [
        { opacity: 0, transform: `translate3d(0, ${14 * d}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 660, delay: 430 * t, easing: SOFT, fill: "forwards" }
    );

    // 4. cta: opacity 0 + Y12 + scale(.985) → none, 580ms, delay 620, SETTLE
    anim(
      ".nx-cta",
      [
        { opacity: 0, transform: `translate3d(0, ${12 * d}px, 0) scale(0.985)` },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      { duration: 580, delay: 620 * t, easing: SETTLE, fill: "forwards" }
    );

    // 5. mark + wordmark: rise 10px, 540ms, delay 600, SOFT
    anim(
      ".nx-mark",
      [
        { opacity: 0, transform: `translate3d(0, ${10 * d}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 540, delay: 600 * t, easing: SOFT, fill: "forwards" }
    );

    anim(
      ".nx-wordmark",
      [
        { opacity: 0, transform: `translate3d(0, ${10 * d}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 540, delay: 600 * t, easing: SOFT, fill: "forwards" }
    );

    // 6. tagline: rise 10px, 540ms, delay 670, SOFT
    anim(
      ".nx-tagline",
      [
        { opacity: 0, transform: `translate3d(0, ${10 * d}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 540, delay: 670 * t, easing: SOFT, fill: "forwards" }
    );

    // 7. each .col: rise 14px, 580ms, delay 720 + i*70, SOFT
    const cols = document.querySelectorAll<HTMLElement>(".nx-col");
    cols.forEach((col, i) => {
      const a = col.animate(
        [
          { opacity: 0, transform: `translate3d(0, ${14 * d}px, 0)` },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ],
        { duration: 580, delay: (720 + i * 70) * t, easing: SOFT, fill: "forwards" }
      );
      animations.push(a);
    });

    // 8. .rule: scaleX 0→1, 720ms, delay 980, EXPO
    anim(
      ".nx-rule",
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: 720, delay: 980 * t, easing: EXPO, fill: "forwards" }
    );

    // 9. legal: rise 8px, 500ms, delay 1120, SOFT
    anim(
      ".nx-legal",
      [
        { opacity: 0, transform: `translate3d(0, ${8 * d}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 500, delay: 1120 * t, easing: SOFT, fill: "forwards" }
    );

    // 10. each .socials a: rise 8px, 500ms, delay 1170 + i*60, SOFT
    const socials = document.querySelectorAll<HTMLElement>(".nx-socials a");
    socials.forEach((item, i) => {
      const a = item.animate(
        [
          { opacity: 0, transform: `translate3d(0, ${8 * d}px, 0)` },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ],
        { duration: 500, delay: (1170 + i * 60) * t, easing: SOFT, fill: "forwards" }
      );
      animations.push(a);
    });

    // Cleanup and remove js-enter on complete
    Promise.all(animations.map((a) => a.finished))
      .then(() => {
        document.documentElement.classList.remove("js-enter");
        animations.forEach((a) => a.cancel());
      })
      .catch(() => {
        document.documentElement.classList.remove("js-enter");
      });
  }, []);

  return (
    <main ref={containerRef} className="nx-viewport">
      {/* Background Video */}
      <div className="nx-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-label="Top view of Tokyo cargo port"
        >
          <source
            src="/assets/mixkit-close-up-of-server-racks-lights-23215-hd-ready.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Aspect-Ratio Driven Scrim */}
      <div className="nx-scrim" />

      {/* Main Fluid Wrap */}
      <div className="nx-main-wrap">
        {/* Left-Aligned Hero */}
        <section className="nx-hero">
          <p className="nx-eyebrow">A long journey begins with a single step</p>

          <div className="nx-headline-mask">
            <h1 className="nx-headline">Dhimas Arista</h1>
          </div>

          <p className="nx-lede">
            Software &amp; Industrial IoT Engineer specializing in distributed
            architecture, real-time telemetry systems, and resilient fullstack software.
          </p>

          {/* Social Media CTA Dock */}
          <div className="nx-cta" aria-label="Social Profiles">
            <a
              href="https://github.com/dhimasarista"
              target="_blank"
              rel="noopener noreferrer"
              className="nx-cta-social"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/dhimasarista"
              target="_blank"
              rel="noopener noreferrer"
              className="nx-cta-social"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 30 30" aria-hidden="true">
                <path d="M24 3H6C4.343 3 3 4.343 3 6v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zM10.15 22.8H6.84V12.14h3.31V22.8zM8.5 10.68c-1.06 0-1.92-.86-1.92-1.92s.86-1.92 1.92-1.92 1.92.86 1.92 1.92-.86 1.92-1.92 1.92zm14.65 12.12h-3.31v-5.18c0-1.24-.02-2.83-1.72-2.83-1.73 0-1.99 1.35-1.99 2.74v5.27h-3.31V12.14h3.18v1.46h.04c.44-.84 1.53-1.72 3.14-1.72 3.36 0 3.98 2.21 3.98 5.09v5.83z" />
              </svg>
            </a>

            <a
              href="https://twitter.com/dhimasarista22"
              target="_blank"
              rel="noopener noreferrer"
              className="nx-cta-social"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://wa.me/6285157248841"
              target="_blank"
              rel="noopener noreferrer"
              className="nx-cta-social"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15-.201.3-.777.979-.953 1.18-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.3.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.233-.245-.587-.494-.507-.677-.517l-.577-.01c-.201 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.429.25-.702.25-1.304.175-1.429-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.02 6.488 2.02 12.016c0 1.956.564 3.784 1.542 5.334L2 22.19l4.98-1.523c1.5 1.002 3.298 1.583 5.06 1.583 5.53 0 10.02-4.488 10.02-10.016C22.06 6.488 17.57 2 12.04 2z" />
              </svg>
            </a>

            <a
              href="mailto:mdhimasarista@gmail.com"
              className="nx-cta-social"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </section>

        {/* Glass Pane Footer */}
        <footer className="nx-footer">
          <div className="nx-footer-inner">
            {/* Top Row: Brand on Left, 3 Columns on Right */}
            <div className="nx-footer-top">
              {/* Left Side: Brand & Tagline */}
              <div className="nx-brand-col">
                <div className="nx-brandrow">
                  <svg
                    className="nx-mark"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M 45.13 1.28 L 54.87 1.28 L 54.87 42.42 L 45.13 38.09 Z" />
                    <path d="M 79.47 12.10 L 87.90 20.53 L 58.80 49.62 L 53.45 38.13 Z" />
                    <path d="M 98.72 45.13 L 98.72 54.87 L 57.58 54.87 L 61.91 45.13 Z" />
                    <path d="M 87.90 79.47 L 79.47 87.90 L 50.38 58.80 L 61.87 53.45 Z" />
                    <path d="M 54.87 98.72 L 45.13 98.72 L 45.13 57.58 L 54.87 61.91 Z" />
                    <path d="M 20.53 87.90 L 12.10 79.47 L 41.20 50.38 L 46.55 61.87 Z" />
                    <path d="M 1.28 54.87 L 1.28 45.13 L 42.42 45.13 L 38.09 54.87 Z" />
                    <path d="M 12.10 20.53 L 20.53 12.10 L 49.62 41.20 L 38.13 46.55 Z" />
                  </svg>
                  <span className="nx-wordmark">Dhimas Arista</span>
                </div>

                <p className="nx-tagline">
                  Engineering distributed architectures, industrial IoT telemetry,
                  and resilient software systems from Batam, Riau Islands.
                </p>
              </div>

              {/* Right Side: 3 Columns Navigation */}
              <nav className="nx-nav">
                {/* Column 1: Experience */}
                <div className="nx-col nx-c1">
                  <h3>WORKS</h3>
                  <ul>
                    <li>
                      <a href="https://epbox-engg.com" target="_blank" rel="noopener noreferrer">
                        EPBOX ENGINEERING PTE LTD
                      </a>
                    </li>
                    
                    <li>
                      <a href="https://bappilu.pdiperjuangankotabatam.com" target="_blank" rel="noopener noreferrer">
                        BAPPILU DPC PDIP KOTA BATAM
                      </a>
                    </li>
                    {/* <li>
                      <Link href="/works">Selected Works Archive (/works)</Link>
                    </li> */}
                  </ul>
                </div>

                {/* Column 2: Capabilities */}
                <div className="nx-col nx-c2">
                  <h3>CAPABILITIES</h3>
                  <ul>
                    <li>
                      <a href="#">Programming</a>
                    </li>
                    <li>
                      <a href="#">Software Architecture</a>
                    </li>
                    <li>
                      <a href="#">Industrial IoT</a>
                    </li>
                    <li>
                      <a href="#">Infra &amp; DevOps</a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Resources */}
                <div className="nx-col nx-c3">
                  <h3>INTERESTS</h3>
                  <ul>
                    <li>
                      <a href="#">Socials</a>
                    </li>
                    <li>
                      <a href="#">Planology</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            {/* Divider Hairline Rule */}
            <div className="nx-rule" />

            {/* Bottom Row: Legal on Left, Socials on Right */}
            <div className="nx-footer-bottom">
              <p className="nx-legal">® 2025 Dhimas Arista all rights reserved.</p>

              <div className="nx-socials">
                <a
                  href="https://linkedin.com/in/dhimasarista"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 30 30" aria-hidden="true">
                    <path d="M24 3H6C4.343 3 3 4.343 3 6v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zM10.15 22.8H6.84V12.14h3.31V22.8zM8.5 10.68c-1.06 0-1.92-.86-1.92-1.92s.86-1.92 1.92-1.92 1.92.86 1.92 1.92-.86 1.92-1.92 1.92zm14.65 12.12h-3.31v-5.18c0-1.24-.02-2.83-1.72-2.83-1.73 0-1.99 1.35-1.99 2.74v5.27h-3.31V12.14h3.18v1.46h.04c.44-.84 1.53-1.72 3.14-1.72 3.36 0 3.98 2.21 3.98 5.09v5.83z" />
                  </svg>
                </a>

                <a
                  href="https://github.com/dhimasarista"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                <a
                  href="https://medium.com/@dhimasarista"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                >
                  <svg viewBox="0 0 1043.63 592.71" aria-hidden="true">
                    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}