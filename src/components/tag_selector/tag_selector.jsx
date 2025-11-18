import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../config/api";
import Tags from "../tags/tags";
import "./tag_selector.scss";

export default function TagSelector({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState("dogs");
  const {
    data: categories,
    loading,
    error,
  } = useFetch(API_ENDPOINTS.categories);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  // Capitalize first letter for display
  const formatLabel = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (loading) {
    return <div className="tag-selector tag-selector--loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="tag-selector tag-selector--error">
        Error loading categories
      </div>
    );
  }

  return (
    <nav className="tag-selector" aria-label="Animal categories">
      <ul className="tag-selector__list">
        {categories &&
          categories.map((category) => (
            <li key={category} className="tag-selector__item">
              <Tags
                label={formatLabel(category)}
                isActive={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            </li>
          ))}
      </ul>
    </nav>
  );
}
