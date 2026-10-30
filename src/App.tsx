import { useState, type FormEvent } from "react";
import DemoResult, { DEFAULT_DEMO_CLAIM } from "./DemoResult";

export default function App() {
  const [input, setInput] = useState(DEFAULT_DEMO_CLAIM);
  const [shownClaim, setShownClaim] = useState(DEFAULT_DEMO_CLAIM);

  const showSimulation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShownClaim(input.trim() || DEFAULT_DEMO_CLAIM);
  };

  const resetExample = () => {
    setInput(DEFAULT_DEMO_CLAIM);
    setShownClaim(DEFAULT_DEMO_CLAIM);
  };

  return (
    <div className="demo-app">
      <header className="demo-topbar">
        <a className="demo-brand" href="/" aria-label="st&u beranda">
          st<span>&</span>u
        </a>
        <span className="demo-mode">Mode simulasi</span>
      </header>

      <main className="demo-main">
        <section className="demo-intro">
          <p className="demo-kicker">Ruang investigasi · versi demo</p>
          <h1>Periksa<span>.</span></h1>
          <p className="demo-lead">
            Contoh alur pemeriksaan klaim nonpolitik dan pencarian literatur. Tidak ada layanan AI
            atau API yang dipanggil.
          </p>
        </section>

        <form className="demo-form" onSubmit={showSimulation}>
          <label htmlFor="claim">Klaim contoh</label>
          <textarea
            id="claim"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            maxLength={1000}
          />
          <div className="demo-form__actions">
            <button className="demo-primary" type="submit">Tampilkan</button>
            <button className="demo-secondary" type="button" onClick={resetExample}>Pakai contoh awal</button>
          </div>
          <p className="demo-small">Mengubah klaim hanya mengubah contoh tampilan, bukan menjalankan verifikasi.</p>
        </form>

        <DemoResult claim={shownClaim} />

        <footer className="demo-footer">
          <span>st&u · Demo statis</span>
          <span>Data simulasi · tanpa token · tanpa API</span>
        </footer>
      </main>
    </div>
  );
}
