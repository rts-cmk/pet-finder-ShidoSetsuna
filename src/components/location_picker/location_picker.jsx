import { MdLocationPin } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import "./location_picker.scss";

const locations = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
  { value: "miami", label: "Miami" },
];

export default function LocationPicker({ initialLocation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (initialLocation) {
      // Try to find a matching location from the list
      const matchedLocation = locations.find(
        (loc) =>
          loc.label.toLowerCase() === initialLocation.toLowerCase() ||
          initialLocation.toLowerCase().includes(loc.label.toLowerCase())
      );
      if (matchedLocation) {
        setSelectedLocation(matchedLocation);
      }
    }
  }, [initialLocation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  const handleKeyDown = (event, location) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(location);
    }
  };

  return (
    <div className="location-picker" ref={dropdownRef}>
      <MdLocationPin className="location-picker__icon" aria-hidden="true" />
      <div className="location-picker__wrapper">
        <button
          type="button"
          className="location-picker__button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select location">
          <span className="location-picker__selected">
            {selectedLocation.label}
          </span>
          <IoIosArrowDown
            className={`location-picker__arrow ${
              isOpen ? "location-picker__arrow--open" : ""
            }`}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <ul className="location-picker__dropdown" role="listbox">
            {locations.map((location) => (
              <li
                key={location.value}
                role="option"
                aria-selected={selectedLocation.value === location.value}
                className={`location-picker__option ${
                  selectedLocation.value === location.value
                    ? "location-picker__option--selected"
                    : ""
                }`}
                onClick={() => handleSelect(location)}
                onKeyDown={(e) => handleKeyDown(e, location)}
                tabIndex={0}>
                {location.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
