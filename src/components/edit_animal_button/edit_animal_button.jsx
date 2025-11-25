import "./edit_animal_button.scss";

export default function EditAnimalButton({ onClick }) {
  return (
    <button
      type="button"
      className="edit-animal-button"
      onClick={onClick}
      aria-label="Edit Animal">
      edit animal details &#9998;
    </button>
  );
}
