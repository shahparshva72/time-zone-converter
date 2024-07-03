import React from "react";
import moment from "moment-timezone";

// Custom Card component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

// Custom Button component
const Button = ({ children, onClick, className = "" }) => (
  <button
    className={`px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Custom Badge component
const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700 ${className}`}>
    {children}
  </span>
);

// Icons
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const TimeZonesGrid = ({ timeZoneList, onDeleteTimeZone }) => {
  const getTimeZoneOffset = (timeZone, format) => {
    return moment.tz(timeZone).format(format);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {timeZoneList.map(({ timeZone, time, date }, index) => (
        <Card key={index}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{timeZone}</h3>
              <ClockIcon />
            </div>
            <div className="text-2xl font-bold text-blue-600">{time}</div>
            <p className="text-sm text-gray-500 mb-2">{date}</p>
            <div className="flex items-center mb-4">
              <MapPinIcon />
              <Badge className="ml-2">
                {getTimeZoneOffset(timeZone, "Z")}
              </Badge>
            </div>
            <Button
              className="w-full flex items-center justify-center"
              onClick={() => onDeleteTimeZone(timeZone)}
            >
              <TrashIcon />
              <span className="ml-2">Remove</span>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TimeZonesGrid;