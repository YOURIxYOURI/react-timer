import { useEffect, useState } from "react"; // Importowanie hooków useEffect i useState z Reacta
import Popup from "./Popup"; // Importowanie komponentu Popup
import "../styles/Timer.css"; // Importowanie pliku stylów CSS dla komponentu Timer

export const Timer = () => {
  const [time, setTime] = useState(0); // Stan przechowujący czas odliczania
  const [running, setRunning] = useState(false); // Stan informujący, czy odliczacz jest uruchomiony
  const [timeEnd, setTimeEnd] = useState(false); // Stan informujący, czy czas odliczania się zakończył

  // Efekt uboczny wykonywany przy zmianie stanu `running`
  useEffect(() => {
    let interval:NodeJS.Timeout; // Zmienna przechowująca interwał

    // Jeśli odliczacz jest uruchomiony i czas odliczania jest większy od 0, ustaw interwał aktualizacji czasu co sekundę
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          // Aktualizacja czasu
          if (prevTime > 0) {
            return prevTime - 1000;
          } else {
            // Jeśli czas odliczania się skończył, ustaw stan `timeEnd` na true i zatrzymaj odliczacz
            setTimeEnd(true);
            clearInterval(interval);
            setRunning(false);
            return prevTime;
          }
        });
      }, 1000);
    }

    // Funkcja zwalniająca interwał przy wyłączeniu komponentu lub zmianie stanu `running`
    return () => clearInterval(interval);
  }, [running, time]); // Zależności efektu od stanów `running` i `time`

  // Funkcja obsługująca uruchamianie/zatrzymywanie odliczacza
  const startStop = () => {
    setRunning(!running); // Zmiana stanu `running`
  };

  // Funkcja obsługująca resetowanie odliczacza
  const reset = () => {
    setTime(0); // Zresetowanie czasu
    setRunning(false); // Zatrzymanie odliczacza
  };

  // Funkcja ustawiająca limit czasu odliczania w zależności od wartości i typu operacji (dodawania/odejmowania)
  const setTimerLimit = (value: number, type: boolean) => {
    if (type) {
      setTime(time + value); // Dodanie wartości do czasu odliczania
    } else {
      if (time - value >= 0) {
        setTime(time - value); // Odejmowanie wartości od czasu odliczania
      } else if (time < value) {
        setTime(0); // Ustawienie czasu na 0, jeśli czas odliczania jest mniejszy od wartości
      }
    }
  };

  // Obliczenie godzin, minut i sekund na podstawie czasu
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = ((time % 3600000) % 60000) / 1000;

  // Renderowanie komponentu
  return (
    <div className="Container">
      <h1>Timer</h1>
      <div className="ButtonContainer">
        {/* Przyciski do dodawania wartości do czasu odliczania */}
        <input
          type="button"
          value={"+1h"}
          className="button"
          onClick={() => setTimerLimit(3600000, true)}
        ></input>
        <input
          type="button"
          value={"+1m"}
          className="button"
          onClick={() => setTimerLimit(60000, true)}
        ></input>
        <input
          type="button"
          value={"+1s"}
          className="button"
          onClick={() => setTimerLimit(1000, true)}
        ></input>
      </div>
      <div className="time">
        {/* Wyświetlanie czasu w formacie godziny:minuty:sekundy */}
        <p className="clock">
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
      </div>
      <div className="ButtonContainer">
        {/* Przyciski do odejmowania wartości od czasu odliczania */}
        <input
          type="button"
          value={"-1h"}
          className="button"
          onClick={() => setTimerLimit(3600000, false)}
        ></input>
        <input
          type="button"
          value={"-1m"}
          className="button"
          onClick={() => setTimerLimit(60000, false)}
        ></input>
        <input
          type="button"
          value={"-1s"}
          className="button"
          onClick={() => setTimerLimit(1000, false)}
        ></input>
      </div>
      <br />
      <div className="ButtonContainer">
        {/* Przycisk uruchamiania/zatrzymywania odliczacza */}
        <input
          type="button"
          value={running ? "Stop" : "Start"}
          className="button"
          onClick={startStop}
        ></input>
        {/* Przycisk resetowania odliczacza */}
        <input
          type="button"
          value={"Reset"}
          className="button"
          onClick={reset}
        ></input>
        {/* Wyświetlanie okna pop-up, jeśli czas odliczania się zakończył */}
        {timeEnd && <Popup />}
      </div>
    </div>
  );
};
