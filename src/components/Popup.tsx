import React from 'react'; // Importowanie biblioteki React
import '../styles/Popup.css'; // Importowanie pliku stylów CSS dla komponentu Popup
import { useNavigate } from 'react-router-dom'; // Importowanie hooka do nawigacji

const Popup: React.FC = () => {
  const navigate = useNavigate(); // Użycie hooka do nawigacji

  // Obsługa przycisku restartu gry
  const handleRestart = () => {
    window.location.reload(); // Przeładowanie strony, aby zrestartować grę
  };

  // Obsługa przycisku przekierowania do strony głównej
  const HandleHomeNavigation = () => {
    navigate('/'); // Przekierowanie do strony głównej
  };

  // Renderowanie komponentu
  return (
    <div className="overlay">
      {/* Okno pop-up */}
      <div className="popup">
        <h2>TIME PASSED!</h2> {/* Nagłówek informujący o zakończeniu gry */}
        <p>GO NEXT?</p> {/* Informacja dla użytkownika */}
        {/* Przycisk restartu gry */}
        <button onClick={handleRestart}>Go again</button>
        {/* Przycisk przekierowania do strony głównej */}
        <button onClick={HandleHomeNavigation}>Go Back Home</button>
      </div>
    </div>
  );
};

export default Popup; // Eksportowanie komponentu Popup
