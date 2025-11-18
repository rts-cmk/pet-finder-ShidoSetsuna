import backgroundSvg from "../../assets/animal_background.svg?react";
import "./animal.scss";

function Animal() {
  const BackgroundSvg = backgroundSvg;

  return (
    <div className="animal-page">
      <div className="animal-page__header">
        <BackgroundSvg className="animal-page__background" />
      </div>
    </div>
  );
}

export default Animal;
