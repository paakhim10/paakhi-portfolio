import ai4safetyPic from "../assets/AI4Safety.jpg";
import tradeAlertPic from "../assets/tradealert.png";
import nerPic from "../assets/NER_AMLC.png";

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
];

export default projects;
