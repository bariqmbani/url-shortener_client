import "./App.css";
import ShortenForm from "./components/ShortenForm";

export default function App() {
  return (
    <>
      <main className="container">
        <div className="f-section web-header">
          <h1>
            <span className="uwu">UwU</span>
            <span className="ext">RL.xyz</span>
          </h1>
        </div>

        <div className="f-section shortener-form">
          <ShortenForm />
        </div>
      </main>
    </>
  );
}
