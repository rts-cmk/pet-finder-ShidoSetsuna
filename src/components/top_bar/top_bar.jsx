import { IoMdNotificationsOutline } from "react-icons/io";
import LocationPicker from "../location_picker/location_picker";
import "./top_bar.scss";

export default function TopBar() {
  // Placeholder image - will be replaced with API data later
  const profileImage = "https://i.pravatar.cc/150?img=12";

  return (
    <header className="top-bar">
      <div className="top-bar__profile">
        <img
          src={profileImage}
          alt="Profile"
          className="top-bar__profile-image"
        />
      </div>

      <LocationPicker />

      <button
        type="button"
        className="top-bar__notification"
        aria-label="Notifications">
        <IoMdNotificationsOutline className="top-bar__notification-icon" />
      </button>
    </header>
  );
}
