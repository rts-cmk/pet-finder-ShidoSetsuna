import { useLoaderData } from "react-router";
import backgroundSvg from "../../assets/animal_background.svg?react";
import "./animal.scss";

function Animal() {
  const { animal, category } = useLoaderData();
  const BackgroundSvg = backgroundSvg;

  return (
    <div className="animal-page">
      <div className="animal-page__header">
        <BackgroundSvg className="animal-page__background" />
        <p>{animal.breed}</p>
      </div>
    </div>
  );
}

export default Animal;
