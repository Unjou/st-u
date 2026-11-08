import { useState, type FormEvent } from "react";
import DemoResult, { DEFAULT_DEMO_URL } from "./DemoResult";

type FocusMode = "health" | "politics";
type InputMode = "auto" | "url" | "text";

export default function App() {
  const [focus, setFocus] = useState<FocusMode>("health");
  const [inputMode, setInputMode] = useState<InputMode>("auto");
  const [input, setInput] = useState(DEFAULT_DEMO_URL);
  const [submitted, setSubmitted] = useState(DEFAULT_DEMO_URL);
  const [submittedMode, setSubmittedMode] = useState<InputMode>("auto");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    setSubmitted(value);
    setSubmittedMode(inputMode);
  };

  const reset = () => {
    setInput(DEFAULT_DEMO_URL);
    setSubmitted(DEFAULT_DEMO_URL);
    setSubmittedMode("auto");
  };

  return <div className="demo-app"><header className="demo-topbar"><a className="demo-brand" href="/" aria-label="st&u beranda">st<span>&</span>u</a><span className="demo-mode">Fact-check / live evidence</span></header><main className="demo-main"><section className="demo-intro"><p className="demo-kicker">Ruang investigasi · reasoning rigor</p><h1>Periksa<span>.</span></h1><p className="demo-lead">Masukkan tautan berita atau tempel kutipan bebas. Sistem membedah klaim, menjaga konsistensi vonis, dan menautkan bukti primer.</p></section><form className="demo-form" onSubmit={submit}><fieldset className="demo-switcher"><legend>Jenis pemeriksaan</legend><div className="demo-switcher__options"><button type="button" className={focus === "health" ? "is-active" : ""} onClick={() => setFocus("health")} aria-pressed={focus === "health"}>Kesehatan / PubMed</button><button type="button" className={focus === "politics" ? "is-active" : ""} onClick={() => setFocus("politics")} aria-pressed={focus === "politics"}>Politik / Media</button></div></fieldset><div className="demo-input-tabs" role="tablist" aria-label="Mode input"><button type="button" className={inputMode === "auto" ? "is-active" : ""} onClick={() => setInputMode("auto")} aria-selected={inputMode === "auto"}>Deteksi otomatis</button><button type="button" className={inputMode === "url" ? "is-active" : ""} onClick={() => setInputMode("url")} aria-selected={inputMode === "url"}>Tautan URL ↗</button><button type="button" className={inputMode === "text" ? "is-active" : ""} onClick={() => setInputMode("text")} aria-selected={inputMode === "text"}>Kutipan teks</button></div><label htmlFor="claim-input">{inputMode === "text" ? "Kutipan yang ingin dibedah" : "URL atau klaim yang ingin diperiksa"}</label><textarea id="claim-input" value={input} onChange={(event) => setInput(event.target.value)} rows={inputMode === "text" ? 5 : 2} placeholder={inputMode === "text" ? "Tempel pesan berantai, cuitan, atau klaim isu di sini…" : "https://contoh.com/artikel atau tempel klaim langsung"} required /><div className="demo-form__actions"><button className="demo-primary" type="submit">Bedah klaim ↗</button><button className="demo-secondary" type="button" onClick={reset}>Pakai contoh awal</button></div><p className="demo-small">Auto-detection: awalan http:// atau https:// diproses sebagai artikel. Teks biasa langsung dipecah menjadi klaim.</p></form><DemoResult input={submitted} inputMode={submittedMode} focus={focus} /><footer className="demo-footer"><span>st&u · consistency cache active</span><span>Evidence first · no watermark</span></footer></main></div>;
}
