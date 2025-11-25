import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/api";
import "./category_selector.scss";

export default function CategorySelector({
  selectedCategory,
  onCategoryChange,
  disabled = false,
  showAddNew = true,
}) {
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing categories
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setShowNewCategory(true);
      onCategoryChange("", true); // Empty category, isNew = true
    } else {
      setShowNewCategory(false);
      setNewCategory("");
      setError("");
      onCategoryChange(value, false);
    }
  };

  const handleNewCategoryChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
    setError("");
    onCategoryChange(value.toLowerCase(), true);
  };

  const validateNewCategory = () => {
    if (!newCategory.trim()) {
      setError("Category name is required");
      return false;
    }
    if (categories.includes(newCategory.toLowerCase())) {
      setError("Category already exists");
      return false;
    }
    return true;
  };

  return (
    <div className="category-selector">
      <div className="category-selector__form-group">
        <label className="category-selector__label" htmlFor="category">
          Category *
        </label>
        <select
          id="category"
          className="category-selector__select"
          value={showNewCategory ? "new" : selectedCategory}
          onChange={handleSelectChange}
          disabled={disabled}
          required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
          {showAddNew && <option value="new">+ Add New Category</option>}
        </select>
      </div>

      {showNewCategory && (
        <>
          <div className="category-selector__form-group">
            <label className="category-selector__label" htmlFor="new-category">
              New Category Name *
            </label>
            <input
              type="text"
              id="new-category"
              className="category-selector__input"
              value={newCategory}
              onChange={handleNewCategoryChange}
              onBlur={validateNewCategory}
              placeholder="e.g., rabbits, fish, reptiles"
              required
            />
            {error && <span className="category-selector__error">{error}</span>}
          </div>
          <div className="category-selector__info">
            <strong>Info:</strong> The new category "
            {newCategory || "newcategory"}" will be automatically created in the
            database when you submit the form.
          </div>
        </>
      )}
    </div>
  );
}
