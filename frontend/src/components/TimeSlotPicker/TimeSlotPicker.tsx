import './TimeSlotPicker.css';

type TimeSlot = {
  time: string;
  available: boolean;
};

type TimeSlotPickerProps = {
  selectedDate: Date | null;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  availableSlots?: TimeSlot[];
};

// Default time slots (możesz później pobierać z API)
const defaultTimeSlots: TimeSlot[] = [
  { time: '17:00', available: true },
  { time: '18:00', available: true },
  { time: '19:00', available: true },
  { time: '20:00', available: true },
];

export default function TimeSlotPicker({ 
  selectedDate, 
  selectedTime, 
  onTimeSelect,
  availableSlots = defaultTimeSlots 
}: TimeSlotPickerProps) {
  if (!selectedDate) {
    return (
      <div className="time-slot-picker-container">
        <p className="time-picker-placeholder">
          Wybierz najpierw datę z kalendarza
        </p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="time-slot-picker-container">
      <h3 className="time-picker-title">Wybierz godzinę</h3>
      <p className="time-picker-date">{formatDate(selectedDate)}</p>
      <div className="time-slots-grid">
        {availableSlots.map((slot) => (
          <button
            key={slot.time}
            className={`time-slot ${!slot.available ? 'unavailable' : selectedTime === slot.time ? 'selected' : 'available'}`}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}

