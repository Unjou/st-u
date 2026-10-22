import "./demo-result.css";

export const DEFAULT_DEMO_CLAIM =
  "Contoh klaim kesehatan: minuman herbal meningkatkan daya tahan tubuh dalam 24 jam.";

type DemoResultProps = {
  claim?: string;
};

export default function DemoResult({ claim = DEFAULT_DEMO_CLAIM }: DemoResultProps) {
  const searchQuery = claim.trim() || DEFAULT_DEMO_CLAIM;
  const isHealthClaim =
    /\b(kesehatan|obat|penyakit|vitamin|suplemen|herbal|gizi|nutrisi|flu|sembuh|khasiat|daya tahan|imunitas)\b/i.test(
      searchQuery,
    );
  const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(searchQuery)}`;
  const pubmedUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(searchQuery)}`;
  const doajSource = JSON.stringify({
    query: { query_string: { query: searchQuery } },
    track_total_hits: true,
  });
  const doajUrl = `https://doaj.org/search/articles?ref=homepage-box&source=${encodeURIComponent(doajSource)}`;

  return (
    <section className="demo-result" aria-labelledby="demo-result-title" data-testid="demo-result">
      <div className="demo-result__banner">Simulasi · bukan hasil verifikasi</div>
      <div className="demo-result__heading">
        <div>
          <p className="demo-result__eyebrow">Hasil contoh</p>
          <h2 id="demo-result-title">Belum terverifikasi</h2>
        </div>
        <span className="demo-result__badge">DEMO</span>
      </div>

      <div className="demo-result__claim">
        <p className="demo-result__eyebrow">Klaim contoh</p>
        <p>{searchQuery}</p>
      </div>

      <p className="demo-result__notice">
        Ini hanya data simulasi untuk memperlihatkan tampilan aplikasi. Klaim di atas tidak
        diperiksa, tidak ada paper nyata yang dirujuk, dan status ini bukan penilaian faktual.
      </p>

      <div className="demo-result__details">
        <div>
          <strong>Yang perlu diperiksa pada riset sungguhan</strong>
          <ul>
            <li>Apakah tersedia tinjauan sistematis atau meta-analisis.</li>
            <li>Metode, jumlah peserta, dan kesesuaian hasil ukur dengan klaim.</li>
            <li>Tanggal publikasi, keterbatasan studi, dan potensi konflik kepentingan.</li>
          </ul>
        </div>
        <div className="demo-result__search">
          <strong>Telusuri literatur</strong>
          <div className="demo-result__links">
            <a href={scholarUrl} target="_blank" rel="noopener noreferrer">
              Google Scholar <span aria-hidden="true">↗</span>
            </a>
            {isHealthClaim && (
              <a href={pubmedUrl} target="_blank" rel="noopener noreferrer">
                PubMed <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href={doajUrl} target="_blank" rel="noopener noreferrer">
              DOAJ <span aria-hidden="true">↗</span>
            </a>
            <a href="https://journalfinder.elsevier.com/" target="_blank" rel="noopener noreferrer">
              Elsevier Journal Finder <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p>
            Elsevier Journal Finder mencocokkan naskah dengan jurnal untuk publikasi; bukan
            pencari paper atau bukti.
          </p>
        </div>
      </div>

      <p className="demo-result__footnote">
        Mode demo bekerja tanpa API atau token. Tautan hanya membuka layanan pencarian; hasilnya
        perlu dinilai sendiri.
      </p>
    </section>
  );
}
