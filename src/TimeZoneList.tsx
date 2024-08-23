import { useState, useEffect } from "react";
import moment from "moment-timezone";
import Select, { SingleValue } from "react-select";
import TimeZonesGrid from "./TimeZonesGrid";
import PropTypes from "prop-types";

interface TimeZoneOption {
  value: string;
  label: string;
}

interface TimeZoneListProps {
  selectedTime: Date;
}

const TimeZoneList: React.FC<TimeZoneListProps> = ({ selectedTime }) => {
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>([]);

  const timeZones = moment.tz.names();

  const getTimeInSelectedTimeZones = () => {
    return selectedTimeZones.map((timeZone) => {
      const timeInTimeZone = moment(selectedTime).tz(timeZone);
      return {
        timeZone,
        time: timeInTimeZone.format("HH:mm"),
        date: timeInTimeZone.format("MMM D, YYYY"),
        isDaytime: timeInTimeZone.hour() >= 6 && timeInTimeZone.hour() < 18,
      };
    });
  };

  const handleTimeZoneSelect = (option: SingleValue<TimeZoneOption>) => {
    if (option) {
      const newTimeZone = option.value;
      if (!selectedTimeZones.includes(newTimeZone)) {
        const updatedTimeZones = [...selectedTimeZones, newTimeZone];
        setSelectedTimeZones(updatedTimeZones);
        localStorage.setItem(
          "selectedTimeZones",
          JSON.stringify(updatedTimeZones),
        );
      }
    }
  };

  useEffect(() => {
    const savedSelectedTimeZones = localStorage.getItem("selectedTimeZones");
    if (savedSelectedTimeZones) {
      setSelectedTimeZones(JSON.parse(savedSelectedTimeZones));
    }
  }, []);

  const handleTimeZoneDelete = (timeZoneToDelete: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the ${timeZoneToDelete} time zone?`,
      )
    ) {
      const filteredTimeZones = selectedTimeZones.filter(
        (timeZone) => timeZone !== timeZoneToDelete,
      );
      setSelectedTimeZones(filteredTimeZones);
      localStorage.setItem(
        "selectedTimeZones",
        JSON.stringify(filteredTimeZones),
      ); // Update local storage
    }
  };

  const options = timeZones.map((tz) => ({
    value: tz,
    label: tz,
  }));

  return (
    <>
      <div className="w-full max-w-xs mt-6 space-y-2">
        <Select
          options={options}
          onChange={handleTimeZoneSelect}
          placeholder="Search for a Timezone"
          className="text-base"
          classNamePrefix="react-select"
        />
      </div>
      <TimeZonesGrid
        timeZoneList={getTimeInSelectedTimeZones()}
        onDeleteTimeZone={handleTimeZoneDelete}
        selectedTime={selectedTime}
      />
    </>
  );
};

TimeZoneList.propTypes = {
  selectedTime: PropTypes.instanceOf(Date).isRequired,
};

export default TimeZoneList;
