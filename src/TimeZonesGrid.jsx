import React from 'react';
import TimeZoneCard from './TimeZoneCard';

const TimeZonesGrid = ({ timeZoneList, onDeleteTimeZone }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {timeZoneList.map((tz) => (
        <TimeZoneCard
          key={tz.timeZone}
          timeZone={tz.timeZone}
          onDelete={onDeleteTimeZone}
        />
      ))}
    </div>
  );
};

export default TimeZonesGrid;