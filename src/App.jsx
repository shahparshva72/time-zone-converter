import React, { useState, useEffect } from 'react';
import TimeZoneList from "./TimeZoneList";
import DateTimePicker from "./DateTimePicker";
import moment from 'moment-timezone';
import Header from './Header';

function App() {
  const [selectedTime, setSelectedTime] = useState(moment().toDate());

  const handleTimeChange = (timeString) => {
    setSelectedTime(timeString);
  };

  useEffect(() => {
    const selectedDate = localStorage.getItem('selectedDate');
    if (selectedDate) {
      setSelectedTime(moment(selectedDate).toDate());
    } else {
      setSelectedTime(moment().toDate());
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-slate-800 to-slate-900 min-h-screen p-4">
      <Header />
      <div className='w-full max-w-screen p-4'>
        <DateTimePicker onDateTimeChange={handleTimeChange} />
        <TimeZoneList selectedTime={selectedTime} />
      </div>
    </div>
  );
}

export default App;
