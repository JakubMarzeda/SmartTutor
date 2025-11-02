import { useState } from 'react';
import './Calendar.css';

type CalendarProps = {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  unavailableDates?: Date[];
};

export default function Calendar({ selectedDate, onDateSelect, unavailableDates = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
                      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavail => 
      unavail.getDate() === date.getDate() &&
      unavail.getMonth() === date.getMonth() &&
      unavail.getFullYear() === date.getFullYear()
    );
  };

  const isDatePast = (date: Date) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDatePast(date) && !isDateUnavailable(date)) {
      onDateSelect(date);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPast = isDatePast(date);
      const isUnavailable = isDateUnavailable(date);
      const isSelected = isDateSelected(date);
      const isToday = date.getDate() === today.getDate() && 
                      date.getMonth() === today.getMonth() && 
                      date.getFullYear() === today.getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-day ${
            isPast || isUnavailable 
              ? 'disabled' 
              : isSelected 
                ? 'selected' 
                : isToday 
                  ? 'today' 
                  : 'available'
          }`}
          onClick={() => !isPast && !isUnavailable && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth} className="calendar-nav-btn">‹</button>
        <h2 className="calendar-month-year">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="calendar-nav-btn">›</button>
      </div>
      <div className="calendar-weekdays">
        {dayNames.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {renderCalendarDays()}
      </div>
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color available"></span>
          <span>Dostępne</span>
        </div>
        <div className="legend-item">
          <span className="legend-color today"></span>
          <span>Dzisiaj</span>
        </div>
        <div className="legend-item">
          <span className="legend-color selected"></span>
          <span>Wybrane</span>
        </div>
        <div className="legend-item">
          <span className="legend-color disabled"></span>
          <span>Niedostępne</span>
        </div>
      </div>
    </div>
  );
}

