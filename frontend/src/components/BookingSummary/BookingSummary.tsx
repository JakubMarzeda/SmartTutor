import './BookingSummary.css';

type BookingSummaryProps = {
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedClass?: string;
  selectedTopic?: string;
  price?: number; // Opcjonalne - jeśli nie podano, obliczane automatycznie
  onBook: () => void;
};

export default function BookingSummary({ 
  selectedDate, 
  selectedTime,
  selectedClass,
  selectedTopic,
  price: priceProp,
  onBook 
}: BookingSummaryProps) {
  const canBook = selectedDate && selectedTime && selectedClass;
  
  // Oblicz cenę na podstawie wybranego poziomu
  const calculatePrice = (classLevel: string): number => {
    // Szkoła podstawowa
    if (classLevel.startsWith('sp-')) {
      return 50;
    }
    // Liceum/Technikum - poziom podstawowy
    if (classLevel.includes('-podst')) {
      return 60;
    }
    // Liceum/Technikum - poziom rozszerzony
    if (classLevel.includes('-rozsz')) {
      return 70;
    }
    // Domyślnie
    return 50;
  };

  const price = priceProp || (selectedClass ? calculatePrice(selectedClass) : 0);
  
  const getClassLabel = (classValue: string) => {
    const classMap: Record<string, string> = {
      'sp-4': 'SP - klasa 4',
      'sp-5': 'SP - klasa 5',
      'sp-6': 'SP - klasa 6',
      'sp-7': 'SP - klasa 7',
      'sp-8': 'SP - klasa 8',
      'lo-1-podst': 'Liceum - klasa 1 (podst.)',
      'lo-1-rozsz': 'Liceum - klasa 1 (rozsz.)',
      'lo-2-podst': 'Liceum - klasa 2 (podst.)',
      'lo-2-rozsz': 'Liceum - klasa 2 (rozsz.)',
      'tech-1-podst': 'Technikum - klasa 1 (podst.)',
      'tech-1-rozsz': 'Technikum - klasa 1 (rozsz.)',
      'tech-2-podst': 'Technikum - klasa 2 (podst.)',
      'tech-2-rozsz': 'Technikum - klasa 2 (rozsz.)',
      'tech-3-podst': 'Technikum - klasa 3 (podst.)',
      'tech-3-rozsz': 'Technikum - klasa 3 (rozsz.)',
    };
    return classMap[classValue] || classValue;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!canBook) {
    return (
      <div className="booking-summary-container">
        <h3 className="summary-title">Podsumowanie rezerwacji</h3>
        <p className="summary-placeholder">
          {!selectedDate || !selectedTime 
            ? 'Wybierz datę i godzinę, aby kontynuować'
            : 'Wybierz poziom zaawansowania, aby kontynuować'}
        </p>
      </div>
    );
  }

  return (
    <div className="booking-summary-container">
      <h3 className="summary-title">Podsumowanie rezerwacji</h3>
      <div className="summary-details">
        <div className="summary-row">
          <span className="summary-label">Data:</span>
          <span className="summary-value">{formatDate(selectedDate)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Godzina:</span>
          <span className="summary-value">{selectedTime}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Czas trwania:</span>
          <span className="summary-value">60 minut</span>
        </div>
        {selectedClass && (
          <div className="summary-row">
            <span className="summary-label">Poziom:</span>
            <span className="summary-value">{getClassLabel(selectedClass)}</span>
          </div>
        )}
        {selectedTopic && (
          <div className="summary-row">
            <span className="summary-label">Temat:</span>
            <span className="summary-value">{selectedTopic}</span>
          </div>
        )}
        <div className="summary-divider"></div>
        <div className="summary-row total">
          <span className="summary-label">Cena:</span>
          <span className="summary-value price">{price} PLN</span>
        </div>
      </div>
      <button 
        onClick={onBook} 
        className="book-button"
      >
        Przejdź do płatności
      </button>
      <p className="summary-note">
        * Możesz anulować rezerwację do 24h przed lekcją
      </p>
    </div>
  );
} 

