import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  onDateTimeChange: (date: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDateTimeChange,
}) => {
  const [startDate, setStartDate] = useState<Date>(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? moment(storedDate).toDate() : new Date();
  });
  const [isCustomTime, setIsCustomTime] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (date: Date) => {
    setStartDate(date);
    setIsCustomTime(true);
    localStorage.setItem("selectedDate", date.toISOString());
    onDateTimeChange(date);
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setStartDate(new Date(storedDate));
      setIsCustomTime(true);
    }

    // Set up the timer to update time every second
    timerRef.current = setInterval(() => {
      if (!isCustomTime) {
        setStartDate(new Date());
        onDateTimeChange(new Date());
      }
    }, 1000);

    // Clean up the timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isCustomTime, onDateTimeChange]);

  const userTimeZone = moment.tz.guess();
  const userTimeZoneOffset = moment.tz(userTimeZone).format("Z (z)");

  const resetToCurrentTime = () => {
    setStartDate(new Date());
    setIsCustomTime(false);
    localStorage.removeItem("selectedDate");
    onDateTimeChange(new Date());
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-lg font-semibold text-white">
        Your current time zone: {userTimeZone} {userTimeZoneOffset}
      </p>
      <label className="text-lg font-semibold text-white">
        Select Date and Time{" "}
      </label>
      <div className="flex flex-row gap-4">
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          dateFormat="MM/dd/yyyy h:mm:ss aa"
          showTimeInput
          timeInputLabel="Time:"
          className="form-input block max-w-xs w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          wrapperClassName="flex flex-col space-y-2"
        />
        {isCustomTime && (
          <button
            onClick={resetToCurrentTime}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-xs w-full"
          >
            Reset to Current Time
          </button>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;
