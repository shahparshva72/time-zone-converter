import TimeZoneCard from "./TimeZoneCard";
import PropTypes from "prop-types";

interface TimeZone {
  timeZone: string;
  time: string;
  date: string;
  isDaytime: boolean;
}

interface TimeZonesGridProps {
  timeZoneList: TimeZone[];
  onDeleteTimeZone: (timeZone: string) => void;
  selectedTime: Date;
}

const TimeZonesGrid: React.FC<TimeZonesGridProps> = ({
  timeZoneList,
  onDeleteTimeZone,
  selectedTime,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {timeZoneList.map((tz) => (
        <TimeZoneCard
          key={tz.timeZone}
          timeZone={tz.timeZone}
          onDelete={onDeleteTimeZone}
          selectedTime={selectedTime}
        />
      ))}
    </div>
  );
};

TimeZonesGrid.propTypes = {
  timeZoneList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteTimeZone: PropTypes.func.isRequired,
  selectedTime: PropTypes.instanceOf(Date).isRequired,
};

export default TimeZonesGrid;
