import { Link } from "react-router";
import { FiMapPin } from "react-icons/fi";
import FavouriteButton from "../favourite_button/favourite_button";
import "./animal_card.scss";

export default function AnimalCard({ animal, onFavouriteToggle }) {
  const handleFavouriteToggle = (isFav) => {
    if (onFavouriteToggle) {
      onFavouriteToggle(animal.id, isFav);
    }
  };

  return (
    <Link to={`/animal/${animal.id}`} className="animal-card">
      <div className="animal-card__image-container">
        <img
          src={animal.image}
          alt={animal.breed}
          className="animal-card__image"
        />
      </div>

      <div className="animal-card__content">
        <h3 className="animal-card__name">{animal.breed}</h3>

        <div className="animal-card__location">
          <FiMapPin className="animal-card__location-icon" />
          <span className="animal-card__location-text">{animal.location}</span>
        </div>

        <p className="animal-card__description">{animal.short_description}</p>
      </div>

      <FavouriteButton
        isFavourite={animal.isFavourite}
        animalId={animal.id}
        onToggle={handleFavouriteToggle}
      />
    </Link>
  );
}
