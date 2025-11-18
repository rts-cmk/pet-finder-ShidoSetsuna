import { MdLocationPin } from "react-icons/md";
import FavouriteButton from "../favourite_button/favourite_button";
import "./animal_card.scss";

export default function AnimalCard({ animal, onFavouriteToggle }) {
  const handleFavouriteToggle = (isFav) => {
    if (onFavouriteToggle) {
      onFavouriteToggle(animal.id, isFav);
    }
  };

  return (
    <article className="animal-card">
      <div className="animal-card__image-container">
        <img
          src={animal.image}
          alt={animal.breed}
          className="animal-card__image"
        />
      </div>

      <div className="animal-card__content">
        <div className="animal-card__header">
          <h3 className="animal-card__name">{animal.breed}</h3>
          <FavouriteButton
            isFavourite={animal.isFavourite}
            onToggle={handleFavouriteToggle}
          />
        </div>

        <div className="animal-card__location">
          <MdLocationPin className="animal-card__location-icon" />
          <span className="animal-card__location-text">{animal.location}</span>
        </div>

        <p className="animal-card__description">{animal.short_description}</p>
      </div>
    </article>
  );
}
