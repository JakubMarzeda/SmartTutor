import './LessonPreferences.css';

type LessonPreferencesProps = {
  selectedClass: string;
  selectedTopic: string;
  onClassChange: (classLevel: string) => void;
  onTopicChange: (topic: string) => void;
};

export default function LessonPreferences({
  selectedClass,
  selectedTopic,
  onClassChange,
  onTopicChange
}: LessonPreferencesProps) {
  const classOptions = [
    // Szkoła podstawowa
    { value: 'sp-4', label: 'Szkoła Podstawowa - klasa 4' },
    { value: 'sp-5', label: 'Szkoła Podstawowa - klasa 5' },
    { value: 'sp-6', label: 'Szkoła Podstawowa - klasa 6' },
    { value: 'sp-7', label: 'Szkoła Podstawowa - klasa 7' },
    { value: 'sp-8', label: 'Szkoła Podstawowa - klasa 8' },
    // Liceum
    { value: 'lo-1-podst', label: 'Liceum - klasa 1 (poziom podstawowy)' },
    { value: 'lo-1-rozsz', label: 'Liceum - klasa 1 (poziom rozszerzony)' },
    { value: 'lo-2-podst', label: 'Liceum - klasa 2 (poziom podstawowy)' },
    { value: 'lo-2-rozsz', label: 'Liceum - klasa 2 (poziom rozszerzony)' },
    // Technikum
    { value: 'tech-1-podst', label: 'Technikum - klasa 1 (poziom podstawowy)' },
    { value: 'tech-1-rozsz', label: 'Technikum - klasa 1 (poziom rozszerzony)' },
    { value: 'tech-2-podst', label: 'Technikum - klasa 2 (poziom podstawowy)' },
    { value: 'tech-2-rozsz', label: 'Technikum - klasa 2 (poziom rozszerzony)' },
    { value: 'tech-3-podst', label: 'Technikum - klasa 3 (poziom podstawowy)' },
    { value: 'tech-3-rozsz', label: 'Technikum - klasa 3 (poziom rozszerzony)' },
  ];

  return (
    <div className="lesson-preferences-container">
      <h3 className="preferences-title">Szczegóły lekcji</h3>
      
      <div className="form-group">
        <label htmlFor="class-level" className="form-label">
          Klasa / Poziom zaawansowania *
        </label>
        <select
          id="class-level"
          value={selectedClass}
          onChange={(e) => onClassChange(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Wybierz poziom</option>
          {classOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="topic" className="form-label">
          Temat lekcji <span className="optional">(opcjonalnie)</span>
        </label>
        <input
          id="topic"
          type="text"
          value={selectedTopic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="np. Funkcje kwadratowe, Trygonometria, Geometria..."
          className="form-input"
        />
        <p className="form-hint">
          Opcjonalnie podaj temat, który chcesz przerabiać na lekcji
        </p>
      </div>
    </div>
  );
}

