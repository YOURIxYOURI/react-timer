// Importujemy hook `useNavigate` z `react-router-dom` oraz hooki `useState` i `useEffect` z Reacta.
import { useNavigate } from "react-router-dom";
import  { useState, useEffect } from "react";

// Importujemy plik stylów dla komponentu `Home`.
import "../styles/home.css";

// Deklarujemy komponent `Home` jako funkcję strzałkową.
export const Home = () => {
  // Używamy hooka `useNavigate` do nawigacji między ścieżkami.
  const navigate = useNavigate();

  // Deklarujemy stan `currentTime` przy użyciu hooka `useState` i ustawiamy go na aktualną datę.
  const [currentTime, setCurrentTime] = useState(new Date());

  // Używamy hooka `useEffect` do wykonywania efektu ubocznego, tj. aktualizacji stanu `currentTime` co sekundę.
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Zwracamy funkcję czyszczącą interwał przy usuwaniu komponentu.
    return () => {
      clearInterval(timerID);
    };
  }, []);

  // Deklarujemy funkcję `ButtonTimerNavigate`, która przekierowuje użytkownika na ścieżkę "/timer" po kliknięciu.
  const ButtonTimerNavigate = () => {
    navigate("/timer");
  };

  // Deklarujemy funkcję `ButtonStopwatchNavigate`, która przekierowuje użytkownika na ścieżkę "/stopwatch" po kliknięciu.
  const ButtonStopwatchNavigate = () => {
    navigate("/stopwatch");
  };

  // Renderujemy interfejs użytkownika komponentu `Home`.
  return (
    <div className="Container">
      <h1>React-Timer</h1>
      <div className="ButtonContainer">
        {/* Renderujemy przycisk "Timer", który po kliknięciu wywołuje funkcję `ButtonTimerNavigate`. */}
        <input
          type="button"
          value="Timer"
          className="Button"
          onClick={ButtonTimerNavigate}
        />
        {/* Renderujemy przycisk "StopWatch", który po kliknięciu wywołuje funkcję `ButtonStopwatchNavigate`. */}
        <input
          type="button"
          value="StopWatch"
          className="Button"
          onClick={ButtonStopwatchNavigate}
        />
      </div>
      {/* Renderujemy zegar, wyświetlając aktualny czas w formacie lokalnym. */}
      <div className="clock">
        <p>{currentTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
