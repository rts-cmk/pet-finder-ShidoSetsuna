import LocationPicker from "../../components/location_picker/location_picker";
import "./home.scss";

function Home() {
  return (
    <div>
      <LocationPicker />
      <h1>Welcome to the Pet App Home Page</h1>
      <p>Find your perfect pet companion here!</p>
    </div>
  );
}

export default Home;
