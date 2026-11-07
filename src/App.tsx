import { useState, type FormEvent } from "react";
import DemoResult, { DEFAULT_DEMO_URL } from "./DemoResult";

type Mode = "health" | "politics";

export default function App() {
  const [mode, setMode] = useState<Mode>("health");
  const [url, setUrl] = useState(DEFAULT_DEMO_URL);
  const [submittedUrl, setSubmittedUrl] = useState(DEFAULT_DEMO_URL);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setLoading(true); setSubmittedUrl(url.trim()); setLoading(false); };
  const reset = () => { setUrl(DEFAULT_DEMO_URL); setSubmittedUrl(DEFAULT_DEMO_URL); };

  return <div className="demo-app"><header className="demo-topbar"><a className="demo-brand" href="/" aria-label="st&u beranda">st<span>&</span>u</a><span className="demo-mode">Live article audit</span></header><main className="demo-main"><section className="demo-intro"><p className="demo-kicker">Ruang investigasi · live extraction</p><h1>Periksa<span>.</span></h1><p className="demo-lead">Masukkan URL artikel. Sistem mengekstrak isi, mengklasifikasikan topik, lalu mencari bukti primer.</p></section><form className="demo-form" onSubmit={submit}><fieldset className="demo-switcher"><legend>Fokus pemeriksaan</legend><div className="demo-switcher__options"><button className={mode === "health" ? "is-active" : ""} type="button" onClick={() => setMode("health")} aria-pressed={mode === "health"}>Kesehatan / PubMed</button><button className={mode === "politics" ? "is-active" : ""} type="button" onClick={() => setMode("politics")} aria-pressed={mode === "politics"}>Politik / Media</button></div></fieldset><label htmlFor="article-url">URL artikel yang ingin diperiksa</label><input id="article-url" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://contoh.com/artikel" required /><div className="demo-form__actions"><button className="demo-primary" type="submit" disabled={loading}>{loading ? "Menganalisis…" : "Ekstrak & periksa"}</button><button className="demo-secondary" type="button" onClick={reset}>Pakai contoh awal</button></div><p className="demo-small">Sumber live: halaman artikel dan PubMed E-Utilities. Tidak ada kalimat hasil yang di-hardcode.</p></form><DemoResult url={submittedUrl} mode={mode} /><footer className="demo-footer"><span>st&u · Live fact-checker</span><span>Evidence first · no watermark</span></footer></main></div>;
}
