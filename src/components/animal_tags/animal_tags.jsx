import { LuDog } from "react-icons/lu";
import { IoMaleFemale } from "react-icons/io5";
import "./animal_tags.scss";

export default function AnimalTags({ breed, gender }) {
  return (
    <div className="animal-tags">
      <div className="animal-tags__tag">
        <div className="animal-tags__icon-wrapper">
          <LuDog className="animal-tags__icon" aria-hidden="true" />
        </div>
        <span className="animal-tags__label">{breed}</span>
      </div>

      <div className="animal-tags__tag">
        <div className="animal-tags__icon-wrapper">
          <IoMaleFemale className="animal-tags__icon" aria-hidden="true" />
        </div>
        <span className="animal-tags__label">
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </span>
      </div>
    </div>
  );
}
