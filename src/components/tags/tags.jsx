import "./tags.scss";

export default function Tags({ label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      className={`tag ${isActive ? "tag--active" : ""}`}
      onClick={onClick}>
      {label}
    </button>
  );
}
