import type { VercelRequest, VercelResponse } from "@vercel/node";

async function extractArticle(url: string) {
  const response = await fetch(url, { headers: { "User-Agent": "st-u-fact-checker/1.0" } });
  if (!response.ok) throw new Error(`Article returned ${response.status}`);
  const html = await response.text();
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() || new URL(url).hostname;
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).filter((text) => text.length > 20);
  return { url, domain: new URL(url).hostname, title, text: paragraphs.slice(0, 20).join(" ").slice(0, 5000) };
}

function inferEntities(article: { title: string; text: string }) {
  const content = `${article.title} ${article.text}`;
  const latin = content.match(/\b[A-Z][a-z]+\s(?:oleifera|indica|sativa|officinalis|longa|turmeric)\b/)?.[0] ?? (/kelor/i.test(content) ? "Moringa oleifera" : /kunyit|curcumin/i.test(content) ? "Curcuma longa" : "medical treatment");
  const condition = /breast cancer|kanker payudara/i.test(content) ? "breast cancer" : /diabetes|gula darah/i.test(content) ? "diabetes" : /covid|coronavirus/i.test(content) ? "COVID-19" : /cancer|kanker|tumor/i.test(content) ? "cancer" : "human health";
  return { latin, condition };
}

async function fetchPubMed(latin: string, condition: string) {
  const term = `(${latin}[Title/Abstract]) AND (${condition}[Title/Abstract]) AND ("2020"[Date - Publication] : "3000"[Date - Publication])`;
  try {
    const search = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&retmax=4`, { signal: AbortSignal.timeout(8000) });
    const ids: string[] = (await search.json()).esearchresult?.idlist ?? [];
    if (!ids.length) return [];
    const summary = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`);
    const result = (await summary.json()).result ?? {};
    return ids.map((pmid) => ({ pmid, title: result[pmid]?.title ?? "Untitled PubMed study", year: result[pmid]?.pubdate?.slice(0, 4) ?? "", study_type: "PubMed indexed study", pubmed_url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` }));
  } catch { return []; }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") return response.status(405).json({ error: "POST required" });
  try {
    const { url } = request.body ?? {};
    if (typeof url !== "string" || !/^https?:\/\//i.test(url)) return response.status(400).json({ error: "Masukkan URL artikel yang valid." });
    const article = await extractArticle(url);
    const health = /health|medical|medicine|disease|cancer|obat|kesehatan|herbal|vaksin|diabetes/i.test(`${article.title} ${article.text}`);
    const claim = article.text.split(/[.!?]/).slice(0, 2).join(" ").slice(0, 280) || article.title;
    const entities = inferEntities(article);
    const papers = health ? await fetchPubMed(entities.latin, entities.condition) : [];
    const query = `"${entities.latin}" AND "${entities.condition}"`;
    const direct_journal_links = [
      { platform: "Google Scholar · 5 tahun", url: `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${entities.latin}" AND "${entities.condition}" AND "clinical trial"`)}&as_ylo=2020`, description: "Telusuri publikasi akademis dan uji klinis manusia sejak 2020." },
      { platform: "PubMed / NCBI · 2020–2025", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}&filter=years.2020-2025`, description: "Database biomedis resmi NIH untuk artikel peer-reviewed." },
      { platform: "Cochrane Library", url: `https://www.cochranelibrary.com/search?searchText=${encodeURIComponent(`${entities.latin} ${entities.condition}`)}`, description: "Basis bukti untuk tinjauan sistematis dan RCT." },
    ];
    const summary = health
      ? `Artikel “${article.title}” mengaitkan ${entities.latin} dengan ${entities.condition}. Bukti live yang tersedia ${papers.length ? `menemukan ${papers.length} paper PubMed terkait` : "belum menemukan paper PubMed yang cocok dengan query ini"}; hasil nol bukan bukti bahwa klaim benar. Perbedaan pentingnya: temuan in vitro atau mekanistik tidak otomatis membuktikan manfaat klinis pada manusia.`
      : `Artikel “${article.title}” dari ${article.domain} dianalisis dari klaim: “${claim}”. Pencarian kesehatan tidak digunakan karena topik terklasifikasi politik/media; verifikasi lanjutan perlu memeriksa sumber primer, tanggal, dan konteks kutipan.`;
    return response.status(200).json({ article_metadata: { ...article, extracted_claims: [claim] }, category: health ? "KESEHATAN" : "POLITIK", verification_status: health ? "BELUM TERBUKTI KLINIS" : "PERLU VERIFIKASI", confidence_score: papers.length ? 72 : 36, evidence_level: health ? (papers.length ? "Literatur PubMed live · perlu telaah metode" : "Bukti klinis belum teridentifikasi pada query live") : "Audit sumber media", dynamic_summary: summary, detailed_debunk_reason: health ? `Klaim perlu dibaca bersama batas biologisnya: ${entities.latin} dan ${entities.condition} adalah istilah pencarian, bukan bukti terapi. Studi laboratorium, bila ada, tidak setara dengan uji klinis acak pada pasien manusia dan tidak menjadi alasan menghentikan terapi dokter.` : "Periksa dokumen asli, sumber kutipan, dan konteks tanggal sebelum menyimpulkan kebenaran klaim.", direct_journal_links, medical_evidence: { pubmed_studies_found: papers }, political_evidence: { media_type: "Artikel web", dewan_pers_status: "Belum diperiksa", fact_check_debunk_sources: [] }, scientific_entities: entities, medical_danger_alert: health ? "PERINGATAN: Jangan menghentikan obat, kemoterapi, atau operasi berdasarkan klaim herbal yang belum tervalidasi secara klinis." : undefined });
  } catch (error) { return response.status(502).json({ error: error instanceof Error ? error.message : "Gagal memproses artikel." }); }
}
