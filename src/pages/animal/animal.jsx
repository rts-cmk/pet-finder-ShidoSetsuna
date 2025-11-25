import { useLoaderData, useNavigate } from "react-router";
import backgroundSvg from "../../assets/animal_background.svg?react";
import AnimalTags from "../../components/animal_tags/animal_tags";
import { FiMapPin } from "react-icons/fi";
import EditAnimalButton from "../../components/edit_animal_button/edit_animal_button";
import "./animal.scss";

function Animal() {
  const { animal, category } = useLoaderData();
  const navigate = useNavigate();
  const BackgroundSvg = backgroundSvg;

  return (
    <main className="animal-page">
      <div className="animal-page__header">
        <BackgroundSvg className="animal-page__background" />
        <img
          src={animal.image}
          alt={animal.breed}
          className="animal-page__image"
        />
      </div>

      <div className="animal-page__content">
        <div className="animal-page__info">
          <div className="animal-page__info-header">
            <h1 className="animal-page__name">{animal.breed}</h1>
            <EditAnimalButton
              onClick={() =>
                navigate(`/admin?category=${category}&animalId=${animal.id}`)
              }
            />
          </div>

          <div className="animal-page__location">
            <FiMapPin className="animal-page__location-icon" />
            <span className="animal-page__location-text">
              {animal.location}
            </span>
          </div>

          <AnimalTags breed={animal.breed} gender={animal.gender} />

          <p className="animal-page__description">{animal.long_description}</p>
        </div>

        <button
          type="button"
          className="animal-page__back-button"
          onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </main>
  );
}

export default Animal;
