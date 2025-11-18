import { useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import "./favourite_button.scss";

export default function FavouriteButton({ isFavourite = false, onToggle }) {
  const [isFav, setIsFav] = useState(isFavourite);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isFav;
    setIsFav(newState);
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
