import React, { useState } from "react";
import paakhiPic from "./assets/paakhi.jpg";
import ai4safetyPic from "./assets/AI4Safety.jpg";
import tradeAlertPic from "./assets/tradealert.png";
import nerPic from "./assets/NER_AMLC.png";
import articles from "./articles";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const blogs = [
    {
      id: 1,
      title: "Can Computers Think?",
      excerpt: "My perspective on how 'brain-like' computers really are.",
      content: articles.canCT,
      date: "November 2025",
      tags: ["Artificial Intelligence", "Philosophy"],
    },
    {
      id: 2,
      title: "Building Vision-Language Systems That Don't Hallucinate",
      excerpt: "Core techniques and failure cases.",
      content:
        "Vision-language models have transformed how machines understand multimodal data, but they come with a critical flaw: hallucination. I've spent months benchmarking models like BLIP-2, Florence-2, and SmolVLM, and the patterns are clear.\n\nHallucinations typically emerge from three sources: insufficient grounding in visual features, over-reliance on language priors from pre-training, and misalignment between what the vision encoder captures and what the language model expects.\n\nIn safety-critical applications like AI4Safety, a single hallucinated object or misread scene can have serious consequences. The solutions? Stronger cross-attention mechanisms, retrieval-augmented architectures that verify claims against image regions, and explicit uncertainty quantification.\n\nBut perhaps most importantly: better evaluation frameworks that go beyond BLEU scores to measure factual accuracy and visual grounding. This is still an open problem, and one I'm deeply invested in solving.",
      date: "October 2024",
      tags: ["Computer Vision", "Multimodal AI"],
    },
    {
      id: 3,
      title: "What Leading a Tech Club Taught Me About People",
      excerpt: "On leadership, empathy, and chaos.",
      content:
        "Leading the Google Developers Student Club wasn't just about organizing hackathons or teaching workshops—it was a masterclass in human dynamics. With 600+ participants, every event became a study in motivation, coordination, and crisis management.\n\nI learned that technical skills are necessary but insufficient for leadership. The real work happens in the invisible hours: mediating team conflicts, recognizing when someone's struggling but won't ask for help, translating ambitious visions into concrete action items that don't overwhelm people.\n\nI learned that empathy isn't softness—it's strategic. Understanding what drives each team member, what they fear, what they hope for, allows you to build systems that bring out their best work.\n\nI learned that chaos is inevitable, but your response to it sets the culture. And perhaps most importantly, I learned that leadership is about creating space for others to lead, not about being indispensable.\n\nThese lessons have shaped how I approach research collaboration and teamwork in ways no technical course ever could.",
      date: "September 2024",
      tags: ["Leadership", "Community"],
    },
    {
      id: 4,
      title: "The Silent Observer",
      excerpt: "A short story about memory, loss, and what we leave behind.",
      content:
        "The old woman sat by the window every afternoon at 3 PM. Not because she had anywhere to be or anyone to meet, but because the light hit the faded photograph on the mantle just right at that hour.\n\nHer grandson would visit on Thursdays, always asking the same questions: 'How are you feeling, Grandma? Did you eat today?' She would nod, smile, offer him tea. But what she really wanted to tell him was about the stories the light told—how it danced across the faces in that photograph, how each ray seemed to whisper a different memory.\n\nShe had been a quantum physicist once, back when women in science were rare enough to make headlines. She'd spent decades studying particles that existed in multiple states simultaneously, never quite here nor there until observed.\n\nNow, in her ninth decade, she understood those particles better than ever. Memory was like that—existing in a superposition of truth and fiction, real and imagined, until someone asked about it and the waveform collapsed into a single, definite story.\n\nThe photograph showed her wedding day. Or was it her daughter's? Sometimes she wasn't sure. The light knew, though. The light always knew.",
      date: "December 2024",
      tags: ["Storytelling", "Fiction"],
    },
    {
      id: 5,
      title: "Between the Lines of Code",
      excerpt: "When debugging becomes existential.",
      content:
        "I've been staring at the same function for three hours. It's a simple recursive algorithm—or it should be. But somewhere between the base case and the recursive call, something breaks. Not the code. Me.\n\nThere's a particular kind of madness that comes with debugging. You start questioning everything: your logic, your syntax, your career choices, the fundamental nature of reality. Is the bug in the code, or in my understanding of what the code should do? Is there even a difference?\n\nI think about Gödel sometimes, in moments like these. His incompleteness theorems proved that within any logical system, there are truths that cannot be proven within that system. Every programming language is a logical system. Every program, a proof.\n\nWhat if the bug isn't a bug at all, but a fundamental limitation of the system itself? What if some problems are, by their very nature, unsolvable?\n\nI add another print statement. The program outputs '42'.\n\nI laugh. Of course it does.\n\nI realize I've been checking the wrong variable for three hours. The bug was in line 7. It always is.",
      date: "November 2024",
      tags: ["Storytelling", "Technology"],
    },
  ];

  const projects = [
    {
      id: 1,
      title: "AI4Safety — Real-Time Camera Violation Detection",
      description:
        "YOLOX-based detection pipeline, temporal reasoning using vector DBs, FastAPI backend, and React dashboard for real‑time monitoring.",
      tags: ["Computer Vision", "Deep Learning", "System Design", "Siemens"],
      thumbnail: ai4safetyPic,
    },
    {
      id: 2,
      title: "TradeAlert — RAG-based Financial Alert System",
      description:
        "News analysis using retrieval‑augmented generation to identify market risks and generate structured trade recommendations.",
      tags: ["NLP", "RAG", "Financial ML"],
      link: "https://github.com/paakhim10/trade-alert",
      thumbnail: tradeAlertPic,
    },
    {
      id: 3,
      title: "Named Entity Recognition for Amazon ML Challenge '24",
      description:
        "Addresses the challenge of automating entity value extraction from raw image data, a crucial task for enhancing e-commerce experiences. Our solution achieved a Top 100 ranking out of over 74,000 participants in the Amazon ML Challenge, focusing on combining fast text recognition with high-accuracy vision-language modeling.",
      tags: ["Multimodal AI", "VLM", "Image Text Recognition"],
      link: "https://github.com/paakhim10/g2ap-ml-challenge",
      thumbnail: nerPic,
    },
    {
      id: 4,
      title: "Google Developers Club Leadership",
      description:
        "Managed 600+ participant hackathons, taught data science workshops, and led a full team while balancing creativity and execution.",
      tags: ["Leadership", "Community Building", "Education"],
      link: "https://www.linkedin.com/in/paakhim10",
      thumbnail: null,
    },
  ];

  const scrollToSection = (sectionId) => {
    setCurrentPage("home");
    setSelectedBlog(null);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const goToWritingPage = () => {
    setCurrentPage("writing");
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setCurrentPage("blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setCurrentPage("home");
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 font-sans">
      <nav className="fixed top-0 left-0 right-0 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <button
            onClick={goHome}
            className="text-lg font-light hover:text-neutral-300 transition-colors"
          >
            Paakhi Maheshwari
          </button>
          <div className="flex gap-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-neutral-400 hover:text-[#C76F5C] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm text-neutral-400 hover:text-[#C76F5C] transition-colors"
            >
              Projects
            </button>
            <button
              onClick={goToWritingPage}
              className="text-sm text-neutral-400 hover:text-[#C76F5C] transition-colors"
            >
              Writing
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-neutral-400 hover:text-[#C76F5C] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {currentPage === "home" ? (
        <>
          <section className="w-full px-6 md:px-12 lg:px-24 pt-32 pb-16 border-b border-neutral-800">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-48 h-48 rounded-full bg-neutral-800 flex-shrink-0 overflow-hidden border-2 border-neutral-700">
                  <img
                    src={paakhiPic}
                    alt="Paakhi Maheshwari"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-light mb-3 tracking-tight">
                    Paakhi Maheshwari
                  </h1>
                  <p className="text-lg text-neutral-400 mb-4 font-light">
                    Applied AI Researcher & Engineer
                  </p>
                  <p className="text-base text-neutral-500 mb-6">
                    Computer Vision · Machine Learning · Applied Research
                  </p>
                  <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                    <a
                      href="https://www.linkedin.com/in/paakhim10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2 text-sm border border-neutral-700 rounded hover:border-[#C76F5C] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.9-2.2 4-2.2 4.3 0 5.1 2.8 5.1 6.4V24h-4v-7.7c0-1.8 0-4.1-2.5-4.1-2.6 0-3 2-3 4V24h-4V8z" />
                      </svg>
                      LinkedIn
                    </a>

                    <a
                      href="https://github.com/paakhim10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2 text-sm border border-neutral-700 rounded hover:border-[#C76F5C] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.55-3.88-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.72-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.12-3.18 0 0 .97-.31 3.18 1.2a11 11 0 0 1 5.8 0c2.2-1.51 3.17-1.2 3.17-1.2.65 1.66.25 2.88.13 3.18.75.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.4-5.25 5.68.41.35.77 1.05.77 2.14v3.17c0 .31.2.67.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.74 18.26.5 12 .5Z" />
                      </svg>
                      GitHub
                    </a>

                    <a
                      href="/Paakhi-Maheshwari-Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2 text-sm bg-[#C76F5C] text-white rounded hover:bg-[#B55F4C] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7V3.5L19.5 9H15ZM8 13h8v2H8v-2Zm0 4h5v2H8v-2Z" />
                      </svg>
                      CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="about"
            className="px-6 md:px-12 lg:px-24 py-20 bg-neutral-900/30"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-light mb-8">About</h2>
              <p className="text-neutral-300 leading-relaxed text-lg font-light">
                I'm an analytical and creative individual passionate about AI
                research, reinforcement learning, and building intelligent
                systems that matter. My work spans computer vision, natural
                language processing, and multimodal AI, with a focus on
                safety-critical applications. I've led the Google Developers
                Student Club, published novels as a teenager, built real-world
                safety systems at Siemens, and worked on deep learning projects
                across vision, language, and RL.
              </p>
            </div>
          </section>

          <section id="projects" className="px-6 md:px-12 lg:px-24 py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-light mb-4">Selected Work</h2>
              <p className="text-neutral-400 mb-12">
                Research and engineering projects in AI and machine learning
              </p>

              <div className="relative">
                <div className="border border-neutral-800 rounded overflow-hidden">
                  {projects[currentProjectIndex].thumbnail && (
                    <div className="w-full h-64 bg-neutral-800 overflow-hidden">
                      <img
                        src={projects[currentProjectIndex].thumbnail}
                        alt={projects[currentProjectIndex].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    <a
                      href={projects[currentProjectIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-normal mb-4 hover:text-[#C76F5C] transition-colors inline-block"
                    >
                      {projects[currentProjectIndex].title}
                      {!projects[currentProjectIndex].tags.includes(
                        "Siemens"
                      ) && " →"}
                    </a>
                    <p className="text-neutral-400 text-base leading-relaxed mb-6 font-light">
                      {projects[currentProjectIndex].description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {projects[currentProjectIndex].tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#C76F5C]/10 text-[#C76F5C] border border-[#C76F5C]/20 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={prevProject}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-neutral-900 border border-neutral-700 rounded-full p-3 hover:border-[#C76F5C] transition-all"
                  aria-label="Previous project"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextProject}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-neutral-900 border border-neutral-700 rounded-full p-3 hover:border-[#C76F5C] transition-all"
                  aria-label="Next project"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="flex justify-center gap-2 mt-6">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProjectIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentProjectIndex
                          ? "w-8 bg-[#C76F5C]"
                          : "w-2 bg-neutral-700 hover:bg-neutral-600"
                      }`}
                      aria-label={`Go to project ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="blogs"
            className="px-6 md:px-12 lg:px-24 py-20 bg-neutral-900/30"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-light mb-4">Recent Writing</h2>
              <p className="text-neutral-400 mb-12">
                Latest thoughts on research, technology, and storytelling
              </p>

              <div className="space-y-6">
                {blogs.slice(0, 3).map((blog) => {
                  const isCreative = blog.tags.includes("Storytelling");
                  return (
                    <div
                      key={blog.id}
                      onClick={() => openBlog(blog)}
                      className={`border p-6 rounded cursor-pointer transition-all group ${
                        isCreative
                          ? "border-blue-900/50 hover:border-blue-700/70 bg-blue-950/20"
                          : "border-neutral-800 hover:border-[#C76F5C]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className={`text-xl font-normal ${
                            isCreative
                              ? "text-blue-400 group-hover:text-blue-300"
                              : "text-[#C76F5C] group-hover:text-[#D88F7C]"
                          }`}
                        >
                          {blog.title}
                        </h3>
                        <span className="text-neutral-500 text-sm whitespace-nowrap ml-4">
                          {blog.date}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-sm font-light mb-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2 flex-wrap flex-1">
                          {blog.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 text-xs rounded ${
                                tag === "Storytelling"
                                  ? "bg-neutral-800/50 text-blue-300 border border-neutral-700/30"
                                  : "bg-neutral-800/50 text-neutral-400 border border-neutral-700/30"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-neutral-300 text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={goToWritingPage}
                  className="px-6 py-3 border border-neutral-700 rounded hover:border-[#C76F5C] transition-colors"
                >
                  View All Writing →
                </button>
              </div>
            </div>
          </section>

          <section id="contact" className="px-6 md:px-12 lg:px-24 py-20">
            <div className="max-w-4xl mx-auto text-center border border-neutral-800 p-12 rounded">
              <h2 className="text-3xl font-light mb-6">Get In Touch</h2>
              <p className="text-neutral-400 mb-8 max-w-lg mx-auto font-light">
                I'm open to research collaborations, interesting projects, and
                thoughtful conversations about AI and technology.
              </p>
              <a
                href="mailto:paakhimaheshwari@gmail.com"
                className="inline-block px-6 py-3 bg-[#C76F5C] text-white rounded hover:bg-[#B55F4C] transition-colors"
              >
                Send Email
              </a>
            </div>
          </section>
        </>
      ) : currentPage === "writing" ? (
        <div className="pt-20 min-h-screen">
          <div className="px-6 md:px-12 lg:px-24 py-12 max-w-4xl mx-auto">
            <button
              onClick={goHome}
              className="text-neutral-400 hover:text-[#C76F5C] mb-8 flex items-center gap-2 transition-all text-sm"
            >
              ← Back to home
            </button>

            <div className="mb-12">
              <h1 className="text-4xl font-light mb-4">All Writing</h1>
              <p className="text-neutral-400">
                Technical research, Storytelling, and everything in between
              </p>
            </div>

            <div className="space-y-6">
              {blogs.map((blog) => {
                const isCreative = blog.tags.includes("Storytelling");
                return (
                  <div
                    key={blog.id}
                    onClick={() => openBlog(blog)}
                    className={`border p-6 rounded cursor-pointer transition-all group ${
                      isCreative
                        ? "border-neutral-800 hover:border-blue-700/70"
                        : "border-neutral-800 hover:border-[#C76F5C]"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className={`text-xl font-normal ${
                          isCreative
                            ? "text-blue-400 group-hover:text-blue-300"
                            : "text-[#C76F5C] group-hover:text-[#D88F7C]"
                        }`}
                      >
                        {blog.title}
                      </h3>
                      <span className="text-neutral-500 text-sm whitespace-nowrap ml-4">
                        {blog.date}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm font-light mb-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2 flex-wrap flex-1">
                        {blog.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs rounded ${
                              tag === "Storytelling"
                                ? "bg-blue-900/30 text-blue-300 border border-blue-800/30"
                                : "bg-neutral-800/50 text-neutral-400 border border-neutral-700/30"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-neutral-300 text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-20 min-h-screen">
          <div className="px-6 md:px-12 lg:px-24 py-12 max-w-4xl mx-auto">
            <button
              onClick={goHome}
              className="text-neutral-400 hover:text-[#C76F5C] mb-8 flex items-center gap-2 transition-all text-sm"
            >
              ← Back to home
            </button>

            {selectedBlog && (
              <>
                <div className="mb-6 pb-6 border-b border-neutral-800">
                  <h1 className="text-4xl font-light mb-4 text-[#C76F5C]">
                    {selectedBlog.title}
                  </h1>
                  <span className="text-neutral-500 text-sm">
                    {selectedBlog.date}
                  </span>
                </div>
                <div className="prose prose-lg prose-invert max-w-none">
                  {selectedBlog.content.split("\n\n").map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-neutral-300 leading-relaxed mb-6 font-light"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
