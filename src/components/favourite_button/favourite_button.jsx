import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import "./favourite_button.scss";

export default function FavouriteButton({
  isFavourite = false,
  onToggle,
  animalId,
  animalCategory,
}) {
  const [isFav, setIsFav] = useState(isFavourite);

  // Sync with localStorage on mount and when animalId changes
  useEffect(() => {
    const favouriteIds = JSON.parse(localStorage.getItem("favourites") || "[]");
    setIsFav(favouriteIds.includes(`${animalCategory}[${animalId}]`));
  }, [animalCategory, animalId]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isFav;
    setIsFav(newState);

    // Update localStorage
    const favouriteIds = JSON.parse(localStorage.getItem("favourites") || "[]");
    const favouriteKey = `${animalCategory}[${animalId}]`;

    if (newState) {
      // Adding to favourites
      if (!favouriteIds.includes(favouriteKey)) {
        favouriteIds.push(favouriteKey);
      }
    } else {
      // Removing from favourites
      const index = favouriteIds.indexOf(favouriteKey);
      if (index > -1) {
        favouriteIds.splice(index, 1);
      }
    }

    localStorage.setItem("favourites", JSON.stringify(favouriteIds));

    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      type="button"
      className={`favourite-button ${isFav ? "favourite-button--active" : ""}`}
      onClick={handleClick}
      aria-label={isFav ? "Remove from favourites" : "Add to favourites"}>
      {isFav ? (
        <IoMdHeart className="favourite-button__icon" />
      ) : (
        <IoMdHeartEmpty className="favourite-button__icon" />
      )}
    </button>
  );
}
