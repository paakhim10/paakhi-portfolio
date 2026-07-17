import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <nav className="relative z-20 max-w-[960px] mx-auto px-6 pt-8 flex justify-between items-baseline">
      <Link
        to="/"
        className="font-display font-medium text-[17px] tracking-tight hover:text-accent-soft transition-colors"
      >
        paakhi<span className="text-accent">.</span>
      </Link>
      <div className="flex gap-5 md:gap-6 items-center">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => goToSection(s.id)}
            className="hidden sm:block text-[14.5px] text-dim hover:text-accent-soft transition-colors"
          >
            {s.label}
          </button>
        ))}
        <Link
          to="/writing"
          className={`text-[14.5px] transition-colors ${
            location.pathname.startsWith("/writing")
              ? "text-accent-soft"
              : "text-dim hover:text-accent-soft"
          }`}
        >
          Writing
        </Link>
        <a
          href="https://paakhim10.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14.5px] text-dim hover:text-accent-soft transition-colors"
        >
          {"Substack ↗︎"}
        </a>
        <button
          onClick={() => goToSection("contact")}
          className="text-[14.5px] text-dim hover:text-accent-soft transition-colors"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
