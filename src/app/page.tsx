"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiPostman,
  SiReactquery,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import type { IconType } from "react-icons";

const SKILL_ICONS: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  "Prisma ORM": SiPrisma,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  "TanStack Query": SiReactquery,
  Zustand: TbBrandFramerMotion,
};

/* ──────────────────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
] as const;

const TYPING_TITLES = [
  "Backend Developer",
  "Microservices Architect",
  "API Engineer",
];

const SKILL_CATEGORIES = [
  {
    label: "Frontend & State",
    items: [
      "React",
      "Next.js",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
    ],
  },
  {
    label: "Backend & Database",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma ORM"],
  },
  {
    label: "Tools & Testing",
    items: ["Git", "GitHub", "Postman", "Bruno"],
  },
];

const PROJECTS = [
  {
    title: "Multi-Tenant Booking System",
    ongoing: true,
    subtitle: "Enterprise SaaS Platform",
    stack: ["Node.js", "TypeScript", "Microservices"],
    bullets: [
      "4 independent services: Auth, Booking, Business, Resource",
      "Centralized API Gateway routing all traffic",
      "JWT authentication with Role-Based Access Control",
      "Prisma ORM with connection pooling",
    ],
    github:
      "https://github.com/suyanthapa/Multi-Tenant-booking-Platform---Backend",
    gradient: "from-blue-600/20 via-indigo-600/20 to-purple-600/20",
    icon: "microservices",
    image: "/images/projects/multitenant.png",
  },
  {
    title: "LevelUp",
    ongoing: false,
    subtitle: "Gamified Productivity Platform",
    stack: ["Next.js", "TypeScript", "Express.js", "Prisma", "PostgreSQL"],
    bullets: [
      "Gamified habits & goals web application",
      "Admin dashboard with Recharts analytics",
      "Socket.IO real‑time communication",
      "Khalti Payment Gateway integration",
    ],
    github: "https://github.com/KrishnaGrg1/LevelUp-Backend",
    github2: "https://github.com/KrishnaGrg1/LevelUp",
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    icon: "gamepad",
    image: "/images/projects/levelup.png",
  },
  {
    title: "Photo Cloud",
    ongoing: false,
    subtitle: "Full‑Stack Photo Sharing Application",
    stack: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "React",
      "Cloudinary",
    ],
    bullets: [
      "Full‑stack photo sharing platform",
      "Multer middleware for file uploads",
      "Cloudinary integration for image storage",
    ],
    github: "https://github.com/suyanthapa/Photo-cloud",
    live: "https://photo-cloud-delta.vercel.app/",
    gradient: "from-orange-600/20 via-rose-600/20 to-pink-600/20",
    icon: "cloud",
    image: "/images/projects/photocloud.png",
  },
];

const ARTICLES = [
  {
    title: "The Hidden Performance Cost of Uncoordinated Prisma Clients",
    excerpt:
      "A deep dive into architecting scalable multi-tenant systems using microservices, API gateways, and tenant isolation patterns.",
    date: "Jan 7, 2026",
    readTime: "8 min read",
    tags: ["Node.js", "Database Performance", "Connection Pooling", "Prisma"],
    link: "https://medium.com/@suyanthapa07/the-hidden-performance-cost-of-uncoordinated-prisma-clients-84f67d2f496b",
    image: "/images/articles/article1.png",
  },
  {
    title:
      "Decoupling Data: Building Scalable Node.js Backends with the Repository Pattern",
    excerpt:
      "Best practices for implementing JSON Web Token authentication with Role-Based Access Control in Express.js applications.",
    date: "Dec 30, 2025",
    readTime: "5 min read",
    tags: ["Node.js", "Typescript", "Software Architecture"],
    link: "https://medium.com/@suyanthapa07/decoupling-data-building-scalable-node-js-backends-with-the-repository-pattern-7df8218dbde9",
    image: "/images/articles/article2.png",
  },
  {
    title:
      "How I centralized error handling in my Node.js app and (stopped copy pasting res.status.json() everytime)",
    excerpt:
      "How to implement the repository pattern for clean data access layers using Prisma, TypeScript, and PostgreSQL.",
    date: "Nov 4, 2025",
    readTime: "2 min read",
    tags: ["Prisma", "Error Handling", "Clean Architecture"],
    link: "https://medium.com/@suyanthapa07/how-i-centralized-error-handling-in-my-node-js-f10a4abc7325",
    image: "/images/articles/article3.png",
  },
];

const EDUCATION = [
  {
    school: "LA Grandee International College",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2021 — 2025",
    location: "Pokhara",
    description:
      "Focused on software engineering, data structures, and web technologies. Built multiple full-stack projects and microservice architectures.",
  },
  {
    school: "Motherland Secondary College",
    degree: "Management — CGPA 3.30",
    period: "2019 — 2021",
    location: "Pokhara",
    description:
      "Studied business management with a focus on analytical thinking and problem-solving fundamentals.",
  },
  {
    school: "Evergreen Secondary Boarding School",
    degree: "SEE — CGPA 3.25",
    period: "2009 — 2019",
    location: "Pokhara",
    description:
      "Completed secondary education with a strong foundation in mathematics, science, and computer basics.",
  },
];

/* ──────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ──────────────────────────────────────────────────────────
   HOOKS
   ────────────────────────────────────────────────────────── */

function useTypingEffect(words: string[], typingSpeed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(
        () => {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        },
        typingSpeed + Math.random() * 40,
      );
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, typingSpeed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, pause]);

  return display;
}

function useCountUp(end: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [end, duration, trigger]);
  return count;
}



/* ──────────────────────────────────────────────────────────
   COMPONENTS — NAVBAR
   ────────────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/80 backdrop-blur-md border-b border-foreground/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-lg tracking-tight text-electric hover:text-emerald transition-colors"
        >
          <span className="text-slate-light">&lt;</span>
          <span className="font-bold">ST</span>
          <span className="text-slate-light"> /&gt;</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm font-medium transition-colors ${
                    active === l.href
                      ? "text-electric"
                      : "text-slate-light hover:text-foreground"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="w-px h-5 bg-foreground/15" />

          {/* Social quick links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/suyan-thapa-8b6895291/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-slate-light hover:text-electric transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-dark text-xs text-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                LinkedIn
              </span>
            </a>
            <a
              href="https://github.com/suyanthapa"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-slate-light hover:text-electric transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-dark text-xs text-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                GitHub
              </span>
            </a>
            <a
              href="mailto:suyanthapa07@gmail.com"
              className="group relative text-slate-light hover:text-electric transition-colors"
              aria-label="Gmail"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-dark text-xs text-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Gmail
              </span>
            </a>
          </div>

        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 w-7 h-7 justify-center"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 bg-foreground transition-transform origin-center ${
              mobileOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-foreground transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-foreground transition-transform origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-md border-b border-foreground/5 px-6 overflow-hidden"
          >
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href} className="py-3 border-t border-foreground/5">
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium ${
                      active === l.href ? "text-electric" : "text-slate-light"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 py-4 border-t border-foreground/5">
              <a
                href="https://linkedin.com/in/suyan-thapa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-light hover:text-electric transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/suyanthapa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-light hover:text-electric transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="mailto:suyanthapa07@gmail.com"
                className="text-slate-light hover:text-electric transition-colors"
                aria-label="Gmail"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — NETWORK GRAPH BACKGROUND
   ────────────────────────────────────────────────────────── */

function HexagonBackground() {
  const nodes = useRef<
    { x: number; y: number; vx: number; vy: number; size: number }[]
  >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create nodes
    const count = Math.min(40, Math.floor(window.innerWidth / 30));
    nodes.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 3 + 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = nodes.current;

      // Move
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // Lines between close nodes
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.15;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of pts) {
        ctx.fillStyle = "rgba(59, 130, 246, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — SECTION WRAPPER
   ────────────────────────────────────────────────────────── */

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`relative py-24 px-6 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      custom={0}
      className="text-3xl md:text-4xl font-bold mb-2 text-foreground"
    >
      {children}
    </motion.h2>
  );
}

function SectionLine() {
  return (
    <motion.div
      variants={fadeUp}
      custom={1}
      className="w-16 h-1 bg-electric rounded-full mb-12"
    />
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — HERO
   ────────────────────────────────────────────────────────── */

function Hero() {
  const typed = useTypingEffect(TYPING_TITLES, 70, 2000);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy"
    >
      <HexagonBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-emerald text-sm md:text-base mb-4 tracking-widest uppercase"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight"
        >
          Suyan Thapa
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="h-10 flex items-center justify-center mb-2"
        >
          <span className="font-mono text-xl md:text-2xl text-electric">
            {typed}
          </span>
          <span className="typing-cursor ml-0.5 inline-block w-0 h-6" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-slate-light flex items-center justify-center gap-2 mb-8 font-mono text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Pokhara, Nepal
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-electric hover:bg-electric/80 text-white rounded-lg font-medium transition-colors text-sm"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-emerald text-emerald hover:bg-emerald/10 rounded-lg font-medium transition-colors text-sm"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex gap-5 justify-center"
        >
          <a
            href="https://github.com/suyanthapa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-light hover:text-electric transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/suyan-thapa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-light hover:text-electric transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:suyanthapa07@gmail.com"
            className="text-slate-light hover:text-electric transition-colors"
            aria-label="Email"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-slate-light/40 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-electric rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — ABOUT
   ────────────────────────────────────────────────────────── */

function StatCounter({
  value,
  suffix,
  label,
  trigger,
}: {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}) {
  const count = useCountUp(value, 1800, trigger);
  return (
    <div className="text-center">
      <span className="text-3xl md:text-4xl font-bold text-electric font-mono">
        {count}
        {suffix}
      </span>
      <p className="text-slate-light text-sm mt-1">{label}</p>
    </div>
  );
}

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-slate-dark/30">
      <Section id="about">
        <SectionTitle>About Me</SectionTitle>
        <SectionLine />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div variants={fadeUp} custom={2}>
            <p className="text-slate-light leading-relaxed mb-6 text-base">
              I&apos;m a dedicated Backend Developer from Pokhara, Nepal with a
              strong focus on building scalable microservice architectures and
              clean RESTful APIs. I specialize in Node.js and TypeScript
              ecosystems — designing systems that are reliable, maintainable,
              and built to handle real-world complexity.
            </p>
            <p className="text-slate-light leading-relaxed mb-8 text-base">
              From multi-tenant SaaS platforms to real-time communication
              systems, I enjoy solving problems at the intersection of system
              design and practical engineering. Every line of code I write is
              about clarity, performance, and long-term maintainability.
            </p>

            <div ref={ref} className="grid grid-cols-3 gap-6">
              <StatCounter
                value={1}
                suffix=""
                label="Microservices Ongoing"
                trigger={inView}
              />
              <StatCounter
                value={1}
                suffix="+"
                label="Years Coding"
                trigger={inView}
              />
              <StatCounter
                value={3}
                suffix="+"
                label="Projects"
                trigger={inView}
              />
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-electric/30 shadow-xl shadow-electric/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile-pic.png"
                  alt="Suyan Thapa"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-3 rounded-2xl border border-electric/20 -z-10" />
              <div className="absolute -inset-6 rounded-2xl border border-electric/10 -z-10" />
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — SKILLS (TERMINAL)
   ────────────────────────────────────────────────────────── */

function TerminalSkills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = SKILL_CATEGORIES.flatMap((cat) => [
    { type: "cmd" as const, text: `ls ./skills/${cat.label.toLowerCase()}` },
    { type: "output" as const, text: cat.items.join("  ") },
    { type: "blank" as const, text: "" },
  ]);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(id);
    }, 300);
    return () => clearInterval(id);
  }, [inView, lines.length]);

  return (
    <Section id="skills">
      <SectionTitle>Technical Skills</SectionTitle>
      <SectionLine />

      <motion.div
        ref={ref}
        variants={fadeUp}
        custom={2}
        className="bg-navy border border-foreground/10 rounded-xl overflow-hidden max-w-3xl mx-auto"
      >
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-dark border-b border-foreground/5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-slate-light/60 font-mono">
            suyan@backend:~/skills$
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[320px]">
          {lines.slice(0, visibleLines).map((line, idx) => {
            if (line.type === "blank") return <div key={idx} className="h-4" />;
            if (line.type === "cmd")
              return (
                <div key={idx} className="flex gap-2">
                  <span className="text-emerald select-none">$</span>
                  <span className="text-foreground">{line.text}</span>
                </div>
              );
            return (
              <div
                key={idx}
                className="text-electric/80 ml-4 flex flex-wrap gap-x-4 gap-y-2"
              >
                {line.text.split("  ").map((item, j) => {
                  const Icon = SKILL_ICONS[item];
                  return (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1.5 bg-electric/10 px-2.5 py-1 rounded text-electric text-xs"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                      {item}
                    </span>
                  );
                })}
              </div>
            );
          })}

          {/* Blinking cursor */}
          {visibleLines < lines.length && inView && (
            <div className="flex gap-2 mt-1">
              <span className="text-emerald select-none">$</span>
              <span className="cursor-blink text-emerald">▋</span>
            </div>
          )}
          {visibleLines >= lines.length && (
            <div className="flex gap-2 mt-1">
              <span className="text-emerald select-none">$</span>
              <span className="cursor-blink text-emerald">▋</span>
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — EXPERIENCE (TIMELINE)
   ────────────────────────────────────────────────────────── */

function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 50%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-slate-dark/30">
      <Section id="experience">
        <SectionTitle>Experience</SectionTitle>
        <SectionLine />

        <div ref={lineRef} className="relative pl-8 md:pl-12 max-w-3xl mx-auto">
          {/* Animated line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-foreground/10">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-electric origin-top"
            />
          </div>

          {/* Experience entry */}
          <motion.div variants={fadeUp} custom={2} className="relative pb-12">
            {/* Dot */}
            <div className="absolute -left-5 md:-left-7 top-1 w-4 h-4 rounded-full border-2 border-electric bg-navy" />

            <div className="bg-navy border border-foreground/10 rounded-xl p-6 border-l-4 border-l-electric">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground">
                      Backend Developer Intern
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 bg-electric/15 text-electric border border-electric/30 rounded-full">
                      Intern
                    </span>
                  </div>
                  <p className="text-electric font-medium text-sm">
                    BrandBuilder
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-light bg-slate-dark/60 px-3 py-1 rounded-full">
                  Apr 2025 — Jul 2025
                </span>
              </div>
              <p className="text-slate-light text-xs mb-4 flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Pokhara, Nepal
              </p>
              <ul className="space-y-2 text-slate-light text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald mt-1.5 text-xs">▹</span>
                  Built and maintained RESTful APIs using Node.js, Express.js,
                  and TypeScript
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald mt-1.5 text-xs">▹</span>
                  Designed database schemas and wrote efficient queries with
                  Prisma ORM and PostgreSQL
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald mt-1.5 text-xs">▹</span>
                  Implemented JWT-based authentication with role-based access
                  control (RBAC)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald mt-1.5 text-xs">▹</span>
                  Collaborated in Agile sprints using Git, GitHub, and code
                  reviews
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — PROJECTS
   ────────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index + 2}
      whileHover={{ y: -6 }}
      className="card-glow group bg-navy border border-foreground/10 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-electric/50"
    >
      {/* Screenshot / Gradient Image area */}
      <div className="relative aspect-video overflow-hidden bg-slate-dark">
        {"image" in project && project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {project.icon === "microservices" && (
                <svg
                  className="w-16 h-16 text-foreground/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              )}
              {project.icon === "gamepad" && (
                <svg
                  className="w-16 h-16 text-foreground/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {project.icon === "cloud" && (
                <svg
                  className="w-16 h-16 text-foreground/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              )}
            </div>
          </>
        )}
        {project.ongoing && (
          <span className="absolute top-3 right-3 text-xs font-mono px-2.5 py-1 bg-emerald/15 text-emerald border border-emerald/30 rounded-full backdrop-blur-sm">
            ONGOING
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-foreground group-hover:text-electric transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-light text-sm">{project.subtitle}</p>
        </div>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-0.5 bg-electric/10 text-electric rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bullets */}
        <ul className="space-y-1.5 mb-6 flex-1">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="text-slate-light text-sm flex items-start gap-2"
            >
              <span className="text-emerald mt-1 text-xs">▹</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-foreground/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-light hover:text-electric transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          {"github2" in project && project.github2 && (
            <a
              href={project.github2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-slate-light hover:text-electric transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Frontend
            </a>
          )}
          {"live" in project && project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-slate-light hover:text-emerald transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionTitle>Projects</SectionTitle>
      <SectionLine />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — ARTICLES
   ────────────────────────────────────────────────────────── */

function Articles() {
  return (
    <div className="bg-slate-dark/30">
      <Section id="articles">
        <SectionTitle>Articles</SectionTitle>
        <SectionLine />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.title}
              variants={fadeUp}
              custom={i + 2}
              whileHover={{ y: -4 }}
              className="group bg-navy border border-foreground/10 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-electric/50 border-l-4 border-l-electric"
            >
              {/* Cover image */}
              {"image" in article && article.image && (
                <div className="relative h-40 overflow-hidden bg-slate-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                {/* Date & Read Time */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-electric bg-electric/10 px-2 py-0.5 rounded">
                    {article.date}
                  </span>
                  <span className="text-xs font-mono text-slate-light">
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-electric transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-light text-sm leading-relaxed mb-4 flex-1">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 bg-electric/10 text-electric rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={article.link}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-electric hover:text-emerald transition-colors mt-auto"
                >
                  Read Article
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Medium CTA */}
        <motion.div variants={fadeUp} custom={6} className="text-center mt-10">
          <a
            href="https://medium.com/@suyanthapa07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-electric/10 border border-electric/30 text-electric rounded-lg font-medium text-sm hover:bg-electric/20 transition-colors"
          >
            Read on Medium
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>
      </Section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — EDUCATION
   ────────────────────────────────────────────────────────── */

function EducationSection() {
  return (
    <div className="bg-slate-dark/30">
      <Section id="education">
        <SectionTitle>Education</SectionTitle>
        <SectionLine />

        <div className="relative max-w-4xl mx-auto">
          {/* Center line — desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-foreground/10 -translate-x-1/2 hidden md:block" />
          {/* Left line — mobile */}
          <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-foreground/10 md:hidden" />

          <div className="space-y-12">
            {EDUCATION.map((edu, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={edu.school}
                  variants={fadeUp}
                  custom={i + 2}
                  className="relative"
                >
                  {/* Circle indicator — desktop */}
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-electric bg-navy z-10 hidden md:block" />
                  {/* Circle indicator — mobile */}
                  <div className="absolute left-0 top-8 w-4 h-4 rounded-full border-2 border-electric bg-navy z-10 md:hidden" />

                  {/* Card container */}
                  <div
                    className={`pl-8 md:pl-0 md:w-1/2 ${
                      isLeft ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <div className="bg-navy border border-foreground/10 rounded-xl p-6 hover:border-electric/30 transition-all duration-300 hover:shadow-lg hover:shadow-electric/5">
                      <span className="inline-block text-xs font-mono px-3 py-1 bg-electric/10 text-electric rounded-full mb-3">
                        {edu.period}
                      </span>
                      <h3 className="font-bold text-foreground text-base mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-electric text-sm mb-2">{edu.school}</p>
                      <p className="text-slate-light text-sm leading-relaxed">
                        {edu.description}
                      </p>
                      <p className="text-slate-light/60 text-xs font-mono mt-3 flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {edu.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — CONTACT
   ────────────────────────────────────────────────────────── */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (form.name && form.email && form.message) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: "", email: "", message: "" });
      }
    },
    [form],
  );

  return (
    <div className="bg-slate-dark/30">
      <Section id="contact">
        <SectionTitle>Get In Touch</SectionTitle>
        <SectionLine />

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info */}
          <motion.div variants={fadeUp} custom={2}>
            <p className="text-slate-light mb-8 leading-relaxed">
              I&apos;m always open to discussing new projects, interesting
              ideas, or opportunities to be part of your engineering team.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  ),
                  label: "suyanthapa07@gmail.com",
                  href: "mailto:suyanthapa07@gmail.com",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  ),
                  label: "+977 980 669 0890",
                  href: "tel:+9779806690890",
                },
                {
                  icon: (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </>
                  ),
                  label: "Pokhara, Nepal",
                  href: undefined,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-electric"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-slate-light hover:text-electric transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-slate-light text-sm">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social buttons */}
            <div className="flex gap-3 mt-8">
              <a
                href="https://github.com/suyanthapa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-navy border border-foreground/10 rounded-lg text-sm text-slate-light hover:text-electric hover:border-electric/30 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/suyan-thapa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-navy border border-foreground/10 rounded-lg text-sm text-slate-light hover:text-electric hover:border-electric/30 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} custom={3}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-slate-light mb-1.5 font-mono"
                >
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-navy border border-foreground/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder-slate-light/40 focus:outline-none focus:border-electric transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-slate-light mb-1.5 font-mono"
                >
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-navy border border-foreground/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder-slate-light/40 focus:outline-none focus:border-electric transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-slate-light mb-1.5 font-mono"
                >
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-navy border border-foreground/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder-slate-light/40 focus:outline-none focus:border-electric transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-electric hover:bg-electric/80 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Send Message
              </button>
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-emerald text-sm text-center font-mono"
                  >
                    Message sent! (Frontend only — connect a backend to deliver)
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPONENTS — FOOTER
   ────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-slate-dark/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Name, Description, Location */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Suyan Thapa
            </h3>
            <p className="text-slate-light text-sm leading-relaxed mb-4">
              Backend Developer &amp; Microservices Architect specializing in
              Node.js, TypeScript, and scalable API systems. Passionate about
              building clean, maintainable software solutions.
            </p>
            <p className="text-slate-light text-sm flex items-center gap-2">
              <svg
                className="w-4 h-4 text-electric"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Pokhara, Nepal
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#hero" },
                { label: "About", href: "#about" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-light hover:text-electric transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-electric text-xs">▹</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Download CV + Socials */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Get My Resume
            </h4>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-electric hover:bg-electric/80 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </a>

            <div className="flex gap-3 mt-6">
              <a
                href="https://github.com/suyanthapa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center text-slate-light hover:text-electric hover:bg-electric/10 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/suyan-thapa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center text-slate-light hover:text-electric hover:bg-electric/10 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:suyanthapa07@gmail.com"
                className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center text-slate-light hover:text-electric hover:bg-electric/10 transition-colors"
                aria-label="Email"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/5 mt-12 pt-8 text-center">
          <p className="text-slate-light text-sm font-mono">
            Built by <span className="text-electric">Suyan Thapa</span> &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE — HOME
   ────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TerminalSkills />
        <Experience />
        <Projects />
        <Articles />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
