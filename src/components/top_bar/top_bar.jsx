import { IoMdNotificationsOutline } from "react-icons/io";
import { useFetch } from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../config/api";
import LocationPicker from "../location_picker/location_picker";
import "./top_bar.scss";

export default function TopBar() {
  const { data: user, loading } = useFetch(API_ENDPOINTS.user);

  return (
    <header className="top-bar">
      <div className="top-bar__profile">
        {loading ? (
          <div className="top-bar__profile-image top-bar__profile-image--loading" />
        ) : (
          <img
            src={user?.image}
            alt="Profile"
            className="top-bar__profile-image"
          />
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
