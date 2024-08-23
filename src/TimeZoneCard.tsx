import { useMemo, useCallback } from "react";
import moment from "moment-timezone";
import { Clock, Trash, Sun, Moon } from "lucide-react";
import PropTypes from "prop-types";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => (
  <button
    className={`px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}>
    {children}
  </span>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

interface TimeZoneCardProps {
  timeZone: string;
  onDelete: (timeZone: string) => void;
  selectedTime: Date;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ timeZone, onDelete, selectedTime }) => {
  const { offset, time, date, isDaytime } = useMemo(() => {
    const now = moment(selectedTime).tz(timeZone);
    return {
      offset: now.format("Z"),
      time: now.format("HH:mm"),
      date: now.format("MMM D, YYYY"),
      isDaytime: now.hour() >= 6 && now.hour() < 18,
    };
  }, [timeZone, selectedTime]);

  const handleDelete = useCallback(
    () => onDelete(timeZone),
    [onDelete, timeZone],
  );

  return (
    <Card className="overflow-hidden">
      <div
        className={`p-4 ${isDaytime ? "bg-gradient-to-br from-blue-400 to-blue-600" : "bg-gradient-to-br from-indigo-800 to-purple-900"}`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-white">{timeZone}</h3>
          {isDaytime ? (
            <Sun className="text-yellow-300" />
          ) : (
            <Moon className="text-gray-300" />
          )}
        </div>
        <div className="text-3xl font-bold text-white mb-1">{time}</div>
        <p className="text-sm text-white/80">{date}</p>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Clock className="text-gray-500" size={18} />
          <Badge className="ml-2 bg-blue-100 text-blue-800">UTC {offset}</Badge>
        </div>
        <Button
          className="w-full flex items-center justify-center"
          onClick={handleDelete}
        >
          <Trash size={18} />
          <span className="ml-2">Remove</span>
        </Button>
      </div>
    </Card>
  );
};

TimeZoneCard.propTypes = {
  timeZone: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedTime: PropTypes.instanceOf(Date).isRequired,
};

export default TimeZoneCard;
