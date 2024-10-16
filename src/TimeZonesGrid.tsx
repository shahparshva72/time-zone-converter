import TimeZoneCard from "./TimeZoneCard";
import PropTypes from "prop-types";

interface TimeZone {
  placeName: string;
  timeZone: string;
  time: string;
  date: string;
  isDaytime: boolean;
}

interface TimeZonesGridProps {
  timeZoneList: TimeZone[];
  onDeleteLocation: (placeName: string) => void;
  selectedTime: Date;
}

const TimeZonesGrid: React.FC<TimeZonesGridProps> = ({
  timeZoneList,
  onDeleteLocation,
  selectedTime,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {timeZoneList.map((tz) => (
        <TimeZoneCard
          key={tz.placeName}
          placeName={tz.placeName}
          timeZone={tz.timeZone}
          time={tz.time}
          date={tz.date}
          isDaytime={tz.isDaytime}
          onDelete={() => onDeleteLocation(tz.placeName)}
          selectedTime={selectedTime}
        />
      ))}
    </div>
  );
};

TimeZonesGrid.propTypes = {
  timeZoneList: PropTypes.arrayOf(
    PropTypes.shape({
      placeName: PropTypes.string.isRequired,
      timeZone: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      isDaytime: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteLocation: PropTypes.func.isRequired,
  selectedTime: PropTypes.instanceOf(Date).isRequired,
};

export default TimeZonesGrid;
