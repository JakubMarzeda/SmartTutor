import './UpcomingLessons.css';

type Lesson = {
  id: string;
  date: Date;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

type UpcomingLessonsProps = {
  lessons?: Lesson[];
};

// Przykładowe dane - później z API
const mockLessons: Lesson[] = [
  {
    id: '1',
    date: new Date(2024, 11, 25, 18, 0),
    time: '18:00',
    status: 'upcoming'
  },
  {
    id: '2',
    date: new Date(2024, 11, 28, 17, 0),
    time: '17:00',
    status: 'upcoming'
  }
];

export default function UpcomingLessons({ lessons = mockLessons }: UpcomingLessonsProps) {
  const upcomingLessons = lessons.filter(lesson => lesson.status === 'upcoming');

  if (upcomingLessons.length === 0) {
    return (
      <div className="upcoming-lessons-container">
        <h3 className="lessons-title">Nadchodzące lekcje</h3>
        <p className="lessons-empty">Brak nadchodzących lekcji</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="upcoming-lessons-container">
      <h3 className="lessons-title">Nadchodzące lekcje</h3>
      <div className="lessons-list">
        {upcomingLessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-date-time">
              <span className="lesson-date">{formatDate(lesson.date)}</span>
              <span className="lesson-time">{lesson.time}</span>
            </div>
            <div className="lesson-actions">
              <button className="lesson-btn cancel">Anuluj</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

