import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 max-w-[960px] mx-auto px-6 mt-16 pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-5 border-t border-rule text-[13px] text-faint">
        <span>© 2026 Paakhi Maheshwari</span>
        <div className="flex gap-5">
          <a
            href="mailto:paakhimaheshwari@gmail.com"
            className="hover:text-accent-soft transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/paakhim10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-soft transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/paakhim10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-soft transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/Paakhi-Maheshwari-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-soft transition-colors"
          >
            Résumé
          </a>
        </div>
      </div>
    </footer>
  );
}
