import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importowanie potrzebnych komponentów z react-router-dom
import { Timer } from "./components/Timer"; // Importowanie komponentu Timer
import { Stopwatch } from "./components/Stopwatch"; // Importowanie komponentu Stopwatch
import { Home } from "./components/Home"; // Importowanie komponentu Home
import "./App.css"; // Importowanie pliku CSS z globalnymi stylami

function App() {
  return (
    <>
      <BrowserRouter> {/* Komponent BrowserRouter, który zapewnia nawigację po stronach zgodnie z adresami URL */}
        <Routes> {/* Kontener dla ścieżek routingu */}
          <Route path="/" element={<Home />} /> {/* Ścieżka dla strony głównej, renderująca komponent Home */}
          <Route path="/timer" element={<Timer />} /> {/* Ścieżka dla strony z timerem, renderująca komponent Timer */}
          <Route path="/stopwatch" element={<Stopwatch />} /> {/* Ścieżka dla strony ze stoperem, renderująca komponent Stopwatch */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App; // Eksportowanie komponentu App jako domyślny
