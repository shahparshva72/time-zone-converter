import React, { useState, useEffect } from "react";
import TimeZoneList from "./TimeZoneList";
import DateTimePicker from "./DateTimePicker";
import moment from "moment-timezone";
import Header from "./Header";

const App: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<Date>(moment().toDate());

  const handleTimeChange = (timeString: Date) => {
    setSelectedTime(timeString);
  };

  useEffect(() => {
    const selectedDate = localStorage.getItem("selectedDate");
    if (selectedDate) {
      setSelectedTime(moment(selectedDate).toDate());
    } else {
      setSelectedTime(moment().toDate());
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-startup-blue min-h-screen p-4 font-semibold tracking-wide">
      <Header />
      <div className="w-full max-w-screen p-4">
        <DateTimePicker onDateTimeChange={handleTimeChange} />
        <TimeZoneList selectedTime={selectedTime} />
      </div>
    </div>
  );
};

export default App;
