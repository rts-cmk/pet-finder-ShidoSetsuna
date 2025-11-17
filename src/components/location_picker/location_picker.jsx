import { MdLocationPin } from "react-icons/md";
import "./location_picker.scss";

export default function LocationPicker() {
  return (
    <div className="location-picker">
      <MdLocationPin />
      <select className="location-picker__select">
        <option value="new-york">New York</option>
        <option value="los-angeles">Los Angeles</option>
        <option value="chicago">Chicago</option>
        <option value="houston">Houston</option>
        <option value="miami">Miami</option>
      </select>
    </div>
  );
}
