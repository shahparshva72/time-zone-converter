import { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment-timezone";
import TimeZonesGrid from "./TimeZonesGrid";
import PropTypes from "prop-types";
import { useLoadScript, Autocomplete, Libraries } from "@react-google-maps/api";

const libraries = ["places"] as Libraries;
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

interface SavedLocation {
  placeName: string;
  timeZoneId: string;
}

interface TimeZoneListProps {
  selectedTime: Date;
}

const TimeZoneList: React.FC<TimeZoneListProps> = ({ selectedTime }) => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Use the static `libraries` array here
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });

  const handlePlaceSelect = useCallback(
    async (place: google.maps.places.PlaceResult | null) => {
      if (place && place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const placeName = place.formatted_address || place.name || "Unknown";

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}×tamp=${Math.floor(
              selectedTime.getTime() / 1000
            )}&key=${googleMapsApiKey}`
          );

          const data = await response.json();

          if (data.status === "OK") {
            const newLocation: SavedLocation = {
              placeName,
              timeZoneId: data.timeZoneId,
            };
            const updatedLocations = [...savedLocations, newLocation];
            setSavedLocations(updatedLocations);
            localStorage.setItem(
              "savedLocations",
              JSON.stringify(updatedLocations)
            );
          } else {
            console.error("Error fetching timezone:", data.errorMessage);
          }
        } catch (error) {
          console.error("Error fetching timezone:", error);
        }
      }
    },
    [selectedTime, savedLocations]
  );

  const getTimeInSavedLocations = () => {
    return savedLocations.map((location) => {
      const timeInTimeZone = moment(selectedTime).tz(location.timeZoneId);
      return {
        placeName: location.placeName,
        timeZone: location.timeZoneId,
        time: timeInTimeZone.format("HH:mm"),
        date: timeInTimeZone.format("MMM D, YYYY"),
        isDaytime: timeInTimeZone.hour() >= 6 && timeInTimeZone.hour() < 18,
      };
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("savedLocations");
    if (savedData) {
      setSavedLocations(JSON.parse(savedData));
    }
  }, []);

  const handleLocationDelete = (placeNameToDelete: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the location: ${placeNameToDelete}?`
      )
    ) {
      const filteredLocations = savedLocations.filter(
        (location) => location.placeName !== placeNameToDelete
      );
      setSavedLocations(filteredLocations);
      localStorage.setItem("savedLocations", JSON.stringify(filteredLocations));
    }
  };

  if (!isLoaded) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <div className="w-full max-w-xs mt-6 space-y-2">
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={() => {
            const place = autocompleteRef.current?.getPlace();
            if (place) {
              handlePlaceSelect(place);
            }
          }}
        >
          <input
            type="text"
            placeholder="Search for a City"
            className="form-input block max-w-xs w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </Autocomplete>
      </div>
      <TimeZonesGrid
        timeZoneList={getTimeInSavedLocations()}
        onDeleteLocation={handleLocationDelete}
        selectedTime={selectedTime}
      />
    </>
  );
};
TimeZoneList.propTypes = {
  selectedTime: PropTypes.instanceOf(Date).isRequired,
};

export default TimeZoneList;
