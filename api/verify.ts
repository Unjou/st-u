import type { VercelRequest, VercelResponse } from "@vercel/node";

async function extractArticle(url: string) {
  const response = await fetch(url, { headers: { "User-Agent": "st-u-fact-checker/1.0" } });
  if (!response.ok) throw new Error(`Article returned ${response.status}`);
  const html = await response.text();
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || new URL(url).hostname;
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).filter(Boolean);
  return { url, domain: new URL(url).hostname, title, text: paragraphs.slice(0, 20).join(" ").slice(0, 5000) };
}

async function fetchPubMed(query: string) {
  const term = `${query} AND (\"2020\"[Date - Publication] : \"3000\"[Date - Publication])`;
  const search = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&retmax=4`);
  const ids: string[] = (await search.json()).esearchresult?.idlist ?? [];
  if (!ids.length) return [];
  const summary = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`);
  const result = (await summary.json()).result ?? {};
  return ids.map((pmid) => ({ pmid, title: result[pmid]?.title ?? "Untitled PubMed study", year: result[pmid]?.pubdate?.slice(0, 4) ?? "", study_type: "PubMed indexed study", pubmed_url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` }));
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") return response.status(405).json({ error: "POST required" });
  try {
    const { url } = request.body ?? {};
    if (typeof url !== "string" || !/^https?:\/\//i.test(url)) return response.status(400).json({ error: "Masukkan URL artikel yang valid." });
    const article = await extractArticle(url);
    const health = /health|medical|medicine|disease|cancer|obat|kesehatan|herbal|vaksin/i.test(`${article.title} ${article.text}`);
    const extractedQuery = article.text.split(/[.!?]/).slice(0, 2).join(" ").slice(0, 180) || article.title;
    const medicalEvidence = health ? await fetchPubMed(extractedQuery) : [];
    return response.status(200).json({ article_metadata: { ...article, extracted_claims: [extractedQuery] }, category: health ? "KESEHATAN" : "POLITIK", verification_status: health ? (medicalEvidence.length ? "BELUM TERBUKTI KLINIS" : "BUKTI TIDAK DITEMUKAN") : "PERLU VERIFIKASI", confidence_score: medicalEvidence.length ? 58 : 32, evidence_level: medicalEvidence.length ? "Publikasi PubMed terindeks" : "Pencarian bukti awal", dynamic_summary: `Artikel “${article.title}” dari ${article.domain} dianalisis dari isi yang berhasil diekstrak. Klaim inti yang ditemukan: “${extractedQuery}”. Status ini hanya mencerminkan bukti yang berhasil ditemukan dari sumber live.`, detailed_debunk_reason: medicalEvidence.length ? `Ditemukan ${medicalEvidence.length} publikasi PubMed terkait. Metadata dan tautan primer ditampilkan agar pembaca dapat memeriksa metode serta populasi penelitian secara langsung.` : "Belum ada bukti primer yang ditemukan dari pencarian awal; hasil ini bukan bukti bahwa klaim benar atau salah.", medical_evidence: { pubmed_studies_found: medicalEvidence }, political_evidence: { media_type: "Belum diaudit", dewan_pers_status: "Belum diperiksa", fact_check_debunk_sources: [] } });
  } catch (error) { return response.status(502).json({ error: error instanceof Error ? error.message : "Gagal memproses artikel." }); }
}
