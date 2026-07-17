import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import paakhiPic from "../assets/paakhi.jpg";
import experiences from "../data/experiences";
import projects from "../data/projects";
import { articles } from "../lib/content";
import WritingRow from "../components/WritingRow";
import SectionHead from "../components/SectionHead";

const EMAIL = "paakhimaheshwari@gmail.com";

export default function Home() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard API unavailable (e.g. http) — fall back to a mailto attempt
      window.location.href = `mailto:${EMAIL}`;
      return;
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  return (
    <div className="relative z-10 max-w-[960px] mx-auto px-6 pt-14">
      {/* Hero */}
      <header className="flex flex-col sm:flex-row gap-10 items-start sm:items-center">
        <img
          src={paakhiPic}
          alt="Paakhi Maheshwari"
          className="w-[168px] h-[168px] rounded-3xl object-cover border border-rule -rotate-2 shadow-[0_20px_50px_-18px_rgb(var(--c-accent)/0.25)] flex-shrink-0"
        />
        <div className="flex-1">
          <h1 className="font-display text-4xl md:text-[44px] font-semibold tracking-tight leading-[1.08]">
            Paakhi Maheshwari<span className="text-accent">.</span>
          </h1>
          <p className="text-accent-soft text-lg mt-2">
            Applied AI Researcher & Engineer
          </p>
          <p className="text-soft font-light mt-3.5 max-w-[62ch]">
            I build computer-vision and multimodal AI systems — currently{" "}
            <b className="font-medium text-ink">AI-native video infrastructure</b>{" "}
            at a stealth startup (SF, remote); previously{" "}
            <b className="font-medium text-ink">
              visual memory research and real-time perception
            </b>{" "}
            at Siemens Technology.
          </p>
          <div className="flex items-center gap-5 mt-5 flex-wrap">
            <div className="flex gap-2.5 flex-wrap">
              <a
                href="/Paakhi-Maheshwari-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-[17px] py-2 text-sm font-display font-medium bg-accent text-page rounded-[10px] hover:brightness-110 hover:-translate-y-px transition-all"
              >
                Résumé
              </a>
              <a
                href="https://github.com/paakhim10"
                target="_blank"
                rel="noopener noreferrer"
                className="px-[17px] py-2 text-sm font-display font-medium border border-rule rounded-[10px] text-dim hover:border-accent hover:text-ink hover:-translate-y-px transition-all"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/paakhim10"
                target="_blank"
                rel="noopener noreferrer"
                className="px-[17px] py-2 text-sm font-display font-medium border border-rule rounded-[10px] text-dim hover:border-accent hover:text-ink hover:-translate-y-px transition-all"
              >
                LinkedIn
              </a>
              <a
                href="mailto:paakhimaheshwari@gmail.com"
                className="px-[17px] py-2 text-sm font-display font-medium border border-rule rounded-[10px] text-dim hover:border-accent hover:text-ink hover:-translate-y-px transition-all"
              >
                Email
              </a>
            </div>
            <span className="font-mono text-[12.5px] text-faint">
              PyTorch · YOLOX · CLIP · Neo4j · FastAPI · React
            </span>
          </div>
        </div>
      </header>

      {/* Experience */}
      <section id="experience" className="mt-14 scroll-mt-8">
        <SectionHead n="01" title="Experience" />
        <div className="border-t border-rule">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="grid md:grid-cols-[172px_1fr] gap-1.5 md:gap-6 px-2.5 py-4 border-b border-rule hover:bg-panel transition-colors"
            >
              <div className="font-mono text-xs text-gold pt-[5px]">
                {exp.period}
                <span className="block text-faint mt-0.5">{exp.location}</span>
              </div>
              <div>
                <h3 className="font-display text-[17px] font-medium inline">
                  {exp.role}
                </h3>{" "}
                <span className="text-dim font-light">· {exp.company}</span>
                {exp.current && (
                  <span className="font-mono text-[10.5px] text-accent border border-accent/40 rounded-full px-2 py-px ml-2 align-[2px]">
                    now
                  </span>
                )}
                <p className="text-dim text-[14.5px] font-light mt-[3px] max-w-[66ch]">
                  {exp.description}
                </p>
                {exp.highlights.length > 0 && (
                  <details className="group mt-1.5">
                    <summary className="font-mono text-[11px] text-faint cursor-pointer hover:text-accent-soft transition-colors list-none select-none [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">+ details</span>
                      <span className="hidden group-open:inline">− details</span>
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          className="text-dim text-[13.5px] font-light flex gap-2"
                        >
                          <span className="text-accent/70 select-none">—</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mt-14 scroll-mt-8">
        <SectionHead n="02" title="Projects" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {projects.map((p) => {
            const CardTag = p.link ? "a" : "div";
            const linkProps = p.link
              ? { href: p.link, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <CardTag
                key={p.id}
                {...linkProps}
                className="relative overflow-hidden flex flex-col gap-2 border border-rule rounded-[14px] p-5 bg-gradient-to-b from-panel to-transparent hover:border-accent/50 hover:-translate-y-0.5 transition-all group"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-display text-[17.5px] font-medium">
                  {p.title.split("—")[0].trim()}
                  {p.link && (
                    <span className="text-dim group-hover:text-accent-soft transition-colors">
                      {" ↗︎"}
                    </span>
                  )}
                </h3>
                <p className="text-dim text-sm font-light flex-1">
                  {p.description}
                </p>
                <span className="font-mono text-[11.5px] text-gold">
                  {p.tags
                    .filter((tag) => tag !== "Siemens")
                    .slice(0, 3)
                    .map((tag) => tag.toLowerCase())
                    .join(" · ")}
                </span>
              </CardTag>
            );
          })}
        </div>
      </section>

      {/* Writing + About */}
      <section className="mt-14 grid md:grid-cols-[1.4fr_1fr] gap-12 items-start">
        <div id="writing" className="scroll-mt-8">
          <SectionHead n="03" title="Writing" />
          <div className="border-t border-rule">
            {articles.slice(0, 4).map((article) => (
              <WritingRow key={article.slug} article={article} />
            ))}
          </div>
          <div className="flex items-center gap-5 mt-3.5">
            <Link
              to="/writing"
              className="text-sm text-dim hover:text-accent-soft transition-colors"
            >
              All writing →
            </Link>
            <a
              href="https://paakhim10.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dim hover:text-accent-soft transition-colors"
            >
              {"Substack ↗︎"}
            </a>
          </div>
        </div>
        <div id="about" className="scroll-mt-8">
          <SectionHead n="04" title="About" />
          <div className="text-soft text-[15.5px] font-light space-y-4">
            <p>
              I like taking models from research paper to running system —
              perception pipelines that hold up in production, agents with
              usable memory, tools people actually operate.
            </p>
            <p>
              Led the Google Developer Student Club at my college, founded a
              storytelling NPO, and have written fiction for years — a novel
              included.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-14 scroll-mt-8">
        <SectionHead n="05" title="Contact" />
        <div className="relative overflow-hidden border border-rule rounded-[14px] p-6 md:p-8 bg-gradient-to-b from-panel to-transparent">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-transparent"
          />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="font-display text-lg font-medium">Get in touch</p>
              <p className="text-dim text-[14.5px] font-light mt-1 max-w-[52ch]">
                I'm open to research collaborations, interesting projects, and
                thoughtful conversations about AI and technology.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={copyEmail}
                className="px-5 py-2.5 text-sm font-display font-medium bg-accent text-page rounded-[10px] hover:brightness-110 hover:-translate-y-px transition-all"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="font-mono text-[12.5px] text-dim hover:text-accent-soft transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
