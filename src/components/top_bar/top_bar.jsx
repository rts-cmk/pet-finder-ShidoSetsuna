import { IoMdNotificationsOutline } from "react-icons/io";
import LocationPicker from "../location_picker/location_picker";
import { CgProfile } from "react-icons/cg";
import "./top_bar.scss";

export default function TopBar({ user }) {
  return (
    <header className="top-bar">
      <div className="top-bar__profile">
        {user?.image ? (
          <img
            src={user.image}
            alt="Profile"
            className="top-bar__profile-image"
          />
        ) : (
          <div className="top-bar__profile-placeholder">
            <CgProfile className="top-bar__profile-icon" />
          </div>
        )}
      </div>

      <LocationPicker initialLocation={user?.location} />

      <button
        type="button"
        className="top-bar__notification"
        aria-label="Notifications">
        <IoMdNotificationsOutline className="top-bar__notification-icon" />
      </button>
    </header>
  );
}
