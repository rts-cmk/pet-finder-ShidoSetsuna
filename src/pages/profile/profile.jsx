import { useLoaderData } from "react-router";
import AnimalCard from "../../components/animal_card/animal_card";
import "./profile.scss";

function Profile() {
  const { user, favoritePets } = useLoaderData();

  const handleFavouriteToggle = (animalId, isFavourite) => {
    console.log(`Animal ${animalId} favourite status:`, isFavourite);
  };

  return (
    <main className="profile-page">
      <div className="profile-page__img-container">
        <img className="profile-page__image" src={user.image} alt={user.name} />
      </div>
      <h1 className="profile-page__name">{user.name}</h1>
      <p className="profile-page__location">{user.location}</p>
      <p className="profile-page__bio">{user.bio}</p>
    </main>
  );
}

export default Profile;
