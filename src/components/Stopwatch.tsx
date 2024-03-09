import { useEffect, useState } from "react"; // Importowanie hooków useEffect i useState z Reacta
import "../styles/Stopwatch.css"; // Importowanie pliku stylów CSS dla komponentu Stopwatch

export const Stopwatch = () => {
  const [time, setTime] = useState(0); // Stan przechowujący czas stopera
  const [running, setRunning] = useState(false); // Stan informujący, czy stoper jest uruchomiony

  // Efekt uboczny wykonywany przy zmianie stanu `running`
  useEffect(() => {
    let interval: NodeJS.Timeout; // Zmienna przechowująca interwał

    // Jeśli stoper jest uruchomiony, ustaw interwał aktualizacji czasu co sekundę
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1000); // Aktualizacja czasu
      }, 1000);
    }

    // Funkcja zwalniająca interwał przy wyłączeniu komponentu lub zmianie stanu `running`
    return () => clearInterval(interval);
  }, [running]); // Zależność efektu od stanu `running`

  // Funkcja obsługująca uruchamianie/zatrzymywanie stopera
  const startStop = () => {
    setRunning(!running); // Zmiana stanu `running`
  };

  // Funkcja obsługująca resetowanie stopera
  const reset = () => {
    setTime(0); // Zresetowanie czasu
    setRunning(false); // Zatrzymanie stopera
  };

  // Obliczenie godzin, minut i sekund na podstawie czasu
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = ((time % 3600000) % 60000) / 1000;

  // Renderowanie komponentu
  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      {/* Wyświetlanie czasu w formacie godziny:minuty:sekundy */}
      <div className="time">
        <p className="clock">
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
      </div>
      {/* Przycisk uruchamiania/zatrzymywania stopera */}
      <input
        type="button"
        value={running ? "Stop" : "Start"}
        className="button"
        onClick={startStop}
      ></input>
      {/* Przycisk resetowania stopera */}
      <input
        type="button"
        value={"Reset"}
        className="button"
        onClick={reset}
      ></input>
    </div>
  );
};
