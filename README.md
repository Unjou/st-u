# <p align="center">**st&u — Claim Traceability & Verification Demo**</p>

<p align="center">
  <em>An evidence-first claim exploration prototype linking everyday health statements to verified academic literature.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Prototype%20%2F%20SIMULASI-amber?style=for-the-badge&logo=codefactor&logoColor=white" alt="Prototype Simulation" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <a href="https://st-u-nine.vercel.app"><strong>View Live Demo »</strong></a>
  &nbsp;&bull;&nbsp;
  <a href="https://github.com/Unjou/st-u"><strong>GitHub Repository »</strong></a>
</p>

---

## 📌 Project Overview

**st&u** is an interactive web prototype exploring evidence-based claim verification and research traceability.

Currently running as a **client-side simulation**, the application demonstrates how everyday assertions (e.g. herbal remedies, nutrition, and wellness trends) can be broken down structurally and channeled directly into external, peer-reviewed scientific databases rather than relying on hearsay, social media claims, or unvetted media reports.

> **Status Notice — SIMULASI (Simulation):**  
> This project is currently an interactive Proof of Concept (PoC). The interface simulates the analytical verification flow; it does not perform automated model parsing or live dynamic citation generation. External links route users to primary academic indexes via curated research queries.

---

## Background & Pivot

| Dimension | Context |
| :--- | :--- |
| **Initial Vision** | The project was initially conceived to address politically biased reportage, misinformation, and media propaganda by cross-referencing political statements against historical archives and multi-perspective datasets. |
| **Current Pivot** | Due to hallucination risks and high domain ambiguity without massive specialized infrastructure, the PoC pivots to **scientific and health claim exploration** (e.g., assessing claims like *"Moringa leaves treat condition X"* via primary biomedical papers). |
| **Long-term Goal** | Establish a robust research retrieval framework before expanding back into multi-source media bias and political verification pipelines. |

---

## User Workflow

```
[ User Claim Input ] ──► [ Structural Proposition Breakdown ] ──► [ Status Badge (Simulation) ] ──► [ External Literature Pivot ]
```

1. **Claim Submission**  
   User enters a colloquial health, nutrition, or herbal claim into the search interface.
2. **Structural Breakdown**  
   The application isolates key assertions, independent variables, and claimed health outcomes.
3. **Status Classification**  
   A simulated status badge (e.g., *Preliminary Evidence*, *Under Investigation*, *Unsubstantiated*) showcases the intended verification indicator.
4. **Primary Research Pivot**  
   Targeted action buttons direct users to academic indexes (such as Google Scholar, PubMed, and Semantic Scholar) pre-populated with optimized keywords.
5. **Context & Disclaimers**  
   Prominent notices ensure users cross-reference findings with qualified medical and scientific authorities.

---

## Tech Stack & Architecture

- **UI Framework:** React with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS & Modern utility classes
- **Hosting:** Vercel (configured via `vercel.json`)
- **Backend / Database:** None required (fully client-side static prototype, 0 API keys required)

---

## Getting Started

### Prerequisites
- Node.js (version 18 or newer recommended)
- npm, pnpm, or yarn

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Unjou/st-u.git
cd st-u

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [`http://localhost:5173`](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```
Compiled static assets are generated in the `dist/` directory.

---

## Deployment

This application is configured for deployment on Vercel:
- **Live URL:** [https://st-u-nine.vercel.app](https://st-u-nine.vercel.app)

To deploy your own instance:
1. Import the repository into your Vercel Dashboard as a Vite project.
2. Set root directory to repository root.
3. Build command: `npm run build`, Output directory: `dist`.

---

## Roadmap

- [ ] Connect live academic APIs (PubMed, Crossref, Semantic Scholar, OpenAlex).
- [ ] Automated query synthesizer converting natural language claims into Boolean and MeSH search expressions.
- [ ] Study methodology and bias extraction (e.g., *in-vitro* vs. randomized controlled human trials).
- [ ] Expand pipeline toward media bias and political statement analysis.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
