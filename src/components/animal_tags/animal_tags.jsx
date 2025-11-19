import { IoPawOutline } from "react-icons/io5";
import { IoMaleFemale } from "react-icons/io5";
import "./animal_tags.scss";

export default function AnimalTags({ breed, gender }) {
  return (
    <div className="animal-tags">
      <div className="animal-tags__tag">
        <div className="animal-tags__icon-wrapper">
          <IoPawOutline
            className="animal-tags__icon breed"
            aria-hidden="true"
          />
        </div>
        <span className="animal-tags__label">{breed}</span>
      </div>

      <div className="animal-tags__tag">
        <div className="animal-tags__icon-wrapper">
          <IoMaleFemale
            className="animal-tags__icon gender"
            aria-hidden="true"
          />
        </div>
        <span className="animal-tags__label">
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </span>
      </div>
    </div>
  );
}
