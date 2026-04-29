import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import type { View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

type Customer = {
  firstname: string;
  lastname: string;
};

type Training = {
  date: string;
  duration: number;
  activity: string;
  customer: Customer | string | null; 
};

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

moment.updateLocale("en", {
  week: { dow: 1 },
});

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);

  

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/gettrainings")
     .then((res) => res.json()) 
      .then((data: Training[]) => {
        const formatted: CalendarEvent[] = data.map((t) => {
          const start = new Date(t.date);
          const end = new Date(start.getTime() + t.duration * 60000);

          return {
            title: `${t.activity} - ${
              t.customer && typeof t.customer === "object"
                ? `${t.customer.firstname} ${t.customer.lastname}`
                : "Unknown"
            }`,
      start,
      end,
    };
  });

  setEvents(formatted);
})
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        views={["month", "week", "day"]}
        style={{ height: "100%" }}
        popup
      />
    </div>
  );
}

export default TrainingCalendar;