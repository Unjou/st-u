# st&u — Claim Traceability & Verification Demo

**st&u** is a prototype web application designed to demonstrate the user flow and interface for evidence-based claim exploration. 

Currently operating as a **client-side simulation**, the app showcases how users can input claims, review structured claim breakdowns, and pivot out to verified academic literature and external research databases rather than relying on hearsay or unverified media narratives.

---

## Background & Project Vision

### The Initial Vision
The concept for **st&u** originally emerged from the widespread challenge of political propaganda, biased reporting, and misinformation in mainstream and digital media. The intended long-term objective was to build an automated pipeline capable of fact-checking politically charged statements and editorial narratives against verifiable historical records and multi-perspective datasets.

### Current Pivot & Prototype Focus
Due to the sheer complexity, high hallucination rates, and contextual nuances involved in political fact-checking without substantial specialized infrastructure, the project currently pivots toward **evidence-based scientific & wellness claim exploration**.

For example, health and nutrition claims frequently circulate unchecked (e.g., *"Moringa leaves treat condition X"*). Rather than accepting generic claims, **st&u** guides users toward verifiable academic research, peer-reviewed journals, and scientific literature to evaluate claims directly from primary sources.

> **Status Disclaimer:**  
> This project is currently an interactive **Proof of Concept (PoC) / Static Prototype**. All results are labeled with **SIMULASI (Simulation)**. The application does not execute live autonomous verification, live paper parsing, or dynamic citation generation. Search buttons direct users to external trusted indexes using curated query parameters.

---

## Core Concept & User Flow

The interface is structured around a streamlined, linear verification workflow:

1. **Claim Submission**
   - The user enters a statement or commonly circulated claim (e.g., herbal properties, nutritional claims, or wellness advice) into the query input.
2. **Structural Breakdown (Simulated Analysis)**
   - The system displays a breakdown of the core proposition, identifying key variables, active ingredients, and purported outcomes.
3. **Evidence Classification**
   - The claim is tagged with an indicative status badge (e.g., *Under Investigation*, *Preliminary Evidence*, or *Unsubstantiated*), illustrating how an automated confidence metric would look in production.
4. **Direct External Pivot**
   - Instead of locking citations inside an opaque model response, the interface presents targeted search actions that route directly to academic repositories (such as Google Scholar, PubMed, or Semantic Scholar) with optimized search strings.
5. **Transparency & Disclaimers**
   - Visual cues and persistent simulation notices remind users to consult primary literature and qualified domain experts before drawing definitive conclusions.

---

## Tech Stack & Architecture

- **Framework:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) for optimized client-side bundling
- **Styling:** Tailwind CSS / Modern CSS utilities
- **Deployment:** [Vercel](https://vercel.com/) (pre-configured via `vercel.json`)
- **Backend / Database:** None required for this phase (zero API keys, tokens, or external database dependencies required).

---

## Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm, pnpm, or yarn

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Unjou/st-u.git
   cd st-u
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

### Production Build

To test or generate the production build:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.

---

## Deployment

The application is deployed on Vercel:
- **Live Demo:** [https://st-u-nine.vercel.app](https://st-u-nine.vercel.app)

To deploy your own fork:
1. Import the repository into your Vercel Dashboard as a Vite project.
2. Ensure the root directory is set to the project root.
3. The build command will automatically run `npm run build`, outputting to `dist/` as defined in `vercel.json`.

---

## Future Roadmap

- [ ] **Live Academic API Integration:** Connect to PubMed, Crossref, Semantic Scholar, and OpenAlex APIs for real-time paper retrieval.
- [ ] **Automated Query Synthesizer:** Transform colloquial claims into Boolean-optimized search queries and MeSH terms.
- [ ] **Contextual Extraction:** Highlight sample sizes, study types (e.g., in-vitro vs. clinical trial), and potential conflicts of interest.
- [ ] **Political & Media Domain Exploration:** Revisit media bias analysis and political claim verification once robust multi-source attribution pipelines are in place.

---

## License

This project is licensed under the MIT License - feel free to use and adapt this prototype for educational and research purposes.
