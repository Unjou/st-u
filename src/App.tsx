import { useState, type FormEvent } from "react";
import DemoResult, { DEFAULT_DEMO_CLAIM } from "./DemoResult";

type Mode = "health" | "politics";

const DEFAULT_POLITICAL_CLAIM = "Klaim politik: hasil pemilu sudah dibatalkan oleh lembaga resmi.";

export default function App() {
  const [mode, setMode] = useState<Mode>("health");
  const [input, setInput] = useState(DEFAULT_DEMO_CLAIM);
  const [shownClaim, setShownClaim] = useState(DEFAULT_DEMO_CLAIM);

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    const nextClaim = nextMode === "health" ? DEFAULT_DEMO_CLAIM : DEFAULT_POLITICAL_CLAIM;
    setInput(nextClaim);
    setShownClaim(nextClaim);
  };

  const showSimulation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShownClaim(input.trim() || (mode === "health" ? DEFAULT_DEMO_CLAIM : DEFAULT_POLITICAL_CLAIM));
  };

  const resetExample = () => {
    const nextClaim = mode === "health" ? DEFAULT_DEMO_CLAIM : DEFAULT_POLITICAL_CLAIM;
    setInput(nextClaim);
    setShownClaim(nextClaim);
  };

  return (
    <div className="demo-app">
      <header className="demo-topbar">
        <a className="demo-brand" href="/" aria-label="st&u beranda">st<span>&</span>u</a>
        <span className="demo-mode">Mode simulasi</span>
      </header>

      <main className="demo-main">
        <section className="demo-intro">
          <p className="demo-kicker">Ruang investigasi · versi demo</p>
          <h1>Periksa<span>.</span></h1>
          <p className="demo-lead">Fact-checker dual-layer untuk klaim kesehatan, politik, dan integritas media.</p>
        </section>

        <form className="demo-form" onSubmit={showSimulation}>
          <fieldset className="demo-switcher">
            <legend>Jenis pemeriksaan</legend>
            <div className="demo-switcher__options">
              <button className={mode === "health" ? "is-active" : ""} type="button" onClick={() => changeMode("health")} aria-pressed={mode === "health"}>Kesehatan / Medis</button>
              <button className={mode === "politics" ? "is-active" : ""} type="button" onClick={() => changeMode("politics")} aria-pressed={mode === "politics"}>Politik / Media</button>
            </div>
          </fieldset>
          <label htmlFor="claim">Klaim yang ingin diperiksa</label>
          <textarea id="claim" value={input} onChange={(event) => setInput(event.target.value)} rows={3} maxLength={1000} />
          <div className="demo-form__actions">
            <button className="demo-primary" type="submit">Tampilkan hasil</button>
            <button className="demo-secondary" type="button" onClick={resetExample}>Pakai contoh awal</button>
          </div>
          <p className="demo-small">Demo lokal: menampilkan struktur hasil tanpa memanggil AI atau API.</p>
        </form>

        <DemoResult claim={shownClaim} mode={mode} />

        <footer className="demo-footer"><span>st&u · Demo statis</span><span>Data simulasi · tanpa token · tanpa API</span></footer>
      </main>
    </div>
  );
}
