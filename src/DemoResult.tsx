import "./demo-result.css";

export const DEFAULT_DEMO_CLAIM = "Contoh klaim kesehatan: minuman herbal meningkatkan daya tahan tubuh dalam 24 jam.";

type DemoResultProps = { claim?: string; mode?: "health" | "politics" };

export default function DemoResult({ claim = DEFAULT_DEMO_CLAIM, mode = "health" }: DemoResultProps) {
  const searchQuery = claim.trim() || DEFAULT_DEMO_CLAIM;
  const isHealth = mode === "health";
  const query = encodeURIComponent(searchQuery);
  const startYear = new Date().getFullYear() - 5;
  const scholarUrl = `https://scholar.google.com/scholar?q=${query}&as_ylo=${startYear}`;
  const pubmedUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${query}&filter=years.${startYear}-${new Date().getFullYear()}`;
  const cochraneUrl = `https://www.cochranelibrary.com/search?searchText=${query}&publishDateRange=${startYear}%20to%20${new Date().getFullYear()}`;

  return (
    <section className="demo-result" aria-labelledby="demo-result-title" data-testid="demo-result">
      <div className="demo-result__banner">Simulasi · bukan hasil verifikasi</div>
      <div className="demo-result__heading">
        <div><p className="demo-result__eyebrow">Hasil {isHealth ? "kesehatan" : "politik & media"}</p><h2 id="demo-result-title">{isHealth ? "Belum terbukti klinis" : "Perlu verifikasi"}</h2></div>
        <span className="demo-result__badge">{isHealth ? "MEDIS" : "POLITIK"}</span>
      </div>
      <div className="demo-result__claim"><p className="demo-result__eyebrow">Klaim yang dianalisis</p><p>{searchQuery}</p></div>
      {isHealth ? (
        <>
          <p className="demo-result__notice">Permukaan klaim belum cukup untuk menyimpulkan manfaat. Cari bukti dengan tinjauan sistematis atau uji klinis manusia, bukan hanya hasil lab.</p>
          <div className="demo-result__details">
            <div><strong>Lapisan pemeriksaan medis</strong><ul><li>Bandingkan dengan konsensus WHO, BPOM, dan Kemenkes.</li><li>Bedakan studi <em>in vitro</em> / hewan dengan uji klinis manusia.</li><li>Periksa publikasi 5 tahun terakhir dan konflik kepentingan.</li></ul></div>
            <div className="demo-result__search"><strong>Telusuri jurnal · 5 tahun terakhir</strong><div className="demo-result__links"><a href={scholarUrl} target="_blank" rel="noopener noreferrer">Google Scholar ↗</a><a href={pubmedUrl} target="_blank" rel="noopener noreferrer">PubMed / NCBI ↗</a><a href={cochraneUrl} target="_blank" rel="noopener noreferrer">Cochrane Library ↗</a></div><p>Prioritaskan systematic review, meta-analysis, atau clinical trial.</p></div>
          </div>
        </>
      ) : (
        <>
          <p className="demo-result__notice demo-result__notice--politics">Status contoh: <strong>MENYESATKAN / DISINFORMASI</strong>. Domain, sumber primer, dan konteks narasi harus dicek sebelum menyebarkan klaim.</p>
          <div className="demo-result__details"><div><strong>Integritas media</strong><div className="demo-tags"><span>BIAS</span><span>CEK DOMAIN</span></div><ul><li>Periksa apakah domain terdaftar dan bukan tiruan/kloning.</li><li>Bandingkan dengan Dewan Pers, CekFakta Mafindo, Tempo, dan klarifikasi resmi.</li><li>Uji judul terhadap isi untuk mendeteksi umpan klik.</li></ul></div><div><strong>Ekstraksi klaim politik</strong><ul><li>Tentukan klaim utama dan tanggal peristiwa.</li><li>Cari sumber primer: dokumen lembaga, data resmi, atau pernyataan lengkap.</li><li>Label akhir: BENAR, SALAH / HOAKS, MENYESATKAN, atau TERMANIPULASI.</li></ul></div></div>
        </>
      )}
      <p className="demo-result__footnote">Data ini hanya demonstrasi UI. Bukan putusan medis, hukum, atau verifikasi faktual aktual.</p>
    </section>
  );
}
