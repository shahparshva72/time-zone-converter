import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Select from "react-select";
import TimeZonesGrid from "./TimeZonesGrid";

const TimeZoneList = ({ selectedTime }) => {
    const [selectedTimeZones, setSelectedTimeZones] = useState([]);

    const timeZones = moment.tz.names();

    const getTimeInSelectedTimeZones = () => {
        return selectedTimeZones.map((timeZone) => {
            const timeInTimeZone = moment(selectedTime).tz(timeZone);
            return {
                timeZone,
                time: timeInTimeZone.format("h:mm A z"),
                date: timeInTimeZone.format("MMM D, YYYY"),
            };
        });
    };

    const handleTimeZoneSelect = (option) => {
        if (option) {
            const newTimeZone = option.value;
            if (!selectedTimeZones.includes(newTimeZone)) {
                const updatedTimeZones = [...selectedTimeZones, newTimeZone];
                setSelectedTimeZones(updatedTimeZones);
                localStorage.setItem("selectedTimeZones", JSON.stringify(updatedTimeZones));
            }
        }
    };

    useEffect(() => {
        const savedSelectedTimeZones = localStorage.getItem("selectedTimeZones");
        if (savedSelectedTimeZones) {
            setSelectedTimeZones(JSON.parse(savedSelectedTimeZones));
        }
    }, []);

    const handleTimeZoneDelete = (timeZoneToDelete) => {
        if (window.confirm(`Are you sure you want to delete the ${timeZoneToDelete} time zone?`)) {
            const filteredTimeZones = selectedTimeZones.filter((timeZone) => timeZone !== timeZoneToDelete);
            setSelectedTimeZones(filteredTimeZones);
            localStorage.setItem("selectedTimeZones", JSON.stringify(filteredTimeZones)); // Update local storage
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
            />
        </>
    );
};

export default TimeZoneList;
