import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Calendar from '../../components/Calendar/Calendar';
import TimeSlotPicker from '../../components/TimeSlotPicker/TimeSlotPicker';
import LessonPreferences from '../../components/LessonPreferences/LessonPreferences';
import BookingSummary from '../../components/BookingSummary/BookingSummary';
import UpcomingLessons from '../../components/UpcomingLessons/UpcomingLessons';
import './Dashboard.css';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBook = () => {
    if (selectedDate && selectedTime && selectedClass) {
      // TODO: Integrate with payment API
      const bookingDetails = {
        date: selectedDate.toLocaleDateString('pl-PL'),
        time: selectedTime,
        class: selectedClass,
        topic: selectedTopic || 'Brak tematu'
      };
      alert(`Rezerwacja na ${bookingDetails.date} o ${bookingDetails.time}\nKlasa: ${bookingDetails.class}\nTemat: ${bookingDetails.topic}\n\nPrzejdź do płatności...`);
      // Navigate to payment or booking confirmation
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-main">
          <section className="booking-section">
            <h2 className="section-title">Zarezerwuj lekcję</h2>
            <div className="booking-content">
              <div className="booking-left">
                <Calendar 
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
                <TimeSlotPicker
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                />
                <LessonPreferences
                  selectedClass={selectedClass}
                  selectedTopic={selectedTopic}
                  onClassChange={setSelectedClass}
                  onTopicChange={setSelectedTopic}
                />
              </div>
              <div className="booking-right">
                <BookingSummary
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedClass={selectedClass}
                  selectedTopic={selectedTopic}
                  onBook={handleBook}
                />
              </div>
            </div>
          </section>

          <section className="lessons-section">
            <UpcomingLessons />
          </section>
        </div>
      </div>
    </div>
  );
}
