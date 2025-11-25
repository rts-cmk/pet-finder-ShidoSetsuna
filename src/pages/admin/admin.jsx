import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { API_BASE_URL } from "../../config/api";
import "./admin.scss";

function Admin() {
  const [searchParams] = useSearchParams();
  const animalId = searchParams.get("animalId");
  const categoryParam = searchParams.get("category");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [originalCategory, setOriginalCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [formData, setFormData] = useState({
    breed: "",
    gender: "male",
    location: "",
    image: "",
    short_description: "",
    long_description: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch existing categories
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !isEditMode) setSelectedCategory(data[0]);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    // If animalId and category are in URL, load that animal for editing
    if (animalId && categoryParam) {
      setLoading(true);
      setIsEditMode(true);

      // Fetch the specific animal from the specified category
      fetch(`${API_BASE_URL}/${categoryParam}`)
        .then((res) => res.json())
        .then((animals) => {
          const foundAnimal = animals.find((a) => a.id === parseInt(animalId));

          if (foundAnimal) {
            setEditingAnimal(foundAnimal);
            setSelectedCategory(categoryParam);
            setOriginalCategory(categoryParam);
            setFormData({
              breed: foundAnimal.breed || "",
              gender: foundAnimal.gender || "male",
              location: foundAnimal.location || "",
              image: foundAnimal.image || "",
              short_description: foundAnimal.short_description || "",
              long_description: foundAnimal.long_description || "",
            });
          } else {
            setMessage({
              text: `Animal with ID ${animalId} not found in ${categoryParam}`,
              type: "error",
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading animal:", err);
          setMessage({ text: "Error loading animal data", type: "error" });
          setLoading(false);
        });
    }
  }, [animalId, categoryParam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setShowNewCategory(true);
      setSelectedCategory("");
    } else {
      setShowNewCategory(false);
      setSelectedCategory(value);
    }
  };

  const deleteAnimalHandler = async () => {
    if (!isEditMode || !editingAnimal) return;
    try {
      // Delete the animal from its original category
      await fetch(`${API_BASE_URL}/${originalCategory}/${editingAnimal.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting animal:", error);
      setMessage({ text: "Error deleting animal", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // Determine which category to use
    const categoryToUse = showNewCategory
      ? newCategory.toLowerCase()
      : selectedCategory;

    if (!categoryToUse) {
      setMessage({ text: "Please select or enter a category", type: "error" });
      return;
    }

    // Validate required fields
    if (!formData.breed || !formData.location || !formData.image) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      return;
    }

    try {
      if (isEditMode && editingAnimal) {
        // UPDATE existing animal
        const updatedAnimal = {
          ...editingAnimal,
          ...formData,
        };

        // Check if category has changed
        if (categoryToUse !== originalCategory) {
          // Delete from old category
          await fetch(
            `${API_BASE_URL}/${originalCategory}/${editingAnimal.id}`,
            {
              method: "DELETE",
            }
          );

          // Add to new category
          await fetch(`${API_BASE_URL}/${categoryToUse}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAnimal),
          });
        } else {
          // Same category, just update
          await fetch(`${API_BASE_URL}/${categoryToUse}/${editingAnimal.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAnimal),
          });
        }

        setMessage({ text: "Animal updated successfully!", type: "success" });
      } else {
        // ADD new animal
        // If adding a new category, add it to the categories list first
        if (showNewCategory && !categories.includes(categoryToUse)) {
          await fetch(`${API_BASE_URL}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([...categories, categoryToUse]),
          });
          setCategories([...categories, categoryToUse]);
        }

        // Get the next available ID for the category
        const existingAnimals = await fetch(
          `${API_BASE_URL}/${categoryToUse}`
        ).then((res) => res.json());
        const nextId =
          existingAnimals.length > 0
            ? Math.max(...existingAnimals.map((a) => a.id)) + 1
            : 1;

        // Add the new animal
        const newAnimal = {
          id: nextId,
          ...formData,
        };

        await fetch(`${API_BASE_URL}/${categoryToUse}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnimal),
        });

        setMessage({ text: "Animal added successfully!", type: "success" });
      }

      // Reset form only if not in edit mode
      if (!isEditMode) {
        setFormData({
          breed: "",
          gender: "male",
          location: "",
          image: "",
          short_description: "",
          long_description: "",
        });
        setNewCategory("");
        setShowNewCategory(false);
        setSelectedCategory(categories[0] || "");
      }
    } catch (error) {
      setMessage({
        text: `Error ${
          isEditMode ? "updating" : "adding"
        } animal. Please try again.`,
        type: "error",
      });
      console.error("Error:", error);
    }
  };

  return (
    <main className="admin-page">
      <h1 className="admin-page__title">
        {isEditMode ? "Edit Animal" : "Add New Animal"}
      </h1>

      {loading && (
        <div className="admin-page__message admin-page__message--info">
          Loading animal data...
        </div>
      )}

      {message.text && (
        <div
          className={`admin-page__message admin-page__message--${message.type}`}>
          {message.text}
        </div>
      )}

      <form className="admin-page__form" onSubmit={handleSubmit}>
        {/* Category Selection */}
        <div className="admin-page__form-group">
          <label className="admin-page__label" htmlFor="category">
            Category *
          </label>
          <select
            id="category"
            className="admin-page__select"
            value={showNewCategory ? "new" : selectedCategory}
            onChange={handleCategoryChange}
            required>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
            <option value="new">+ Add New Category</option>
          </select>
        </div>

        {/* New Category Input */}
        {showNewCategory && (
          <div className="admin-page__form-group">
            <label className="admin-page__label" htmlFor="new-category">
              New Category Name *
            </label>
            <input
              type="text"
              id="new-category"
              className="admin-page__input"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g., rabbits, fish, reptiles"
              required
            />
          </div>
        )}

        {/* Breed */}
        <div className="admin-page__form-group">
          <label className="admin-page__label" htmlFor="breed">
            Breed *
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            className="admin-page__input"
            value={formData.breed}
            onChange={handleInputChange}
            placeholder="e.g., Golden Retriever"
            required
          />
        </div>

        {/* Gender */}
        <div className="admin-page__form-group">
          <label className="admin-page__label" htmlFor="gender">
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            className="admin-page__select"
            value={formData.gender}
            onChange={handleInputChange}
            required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Location */}
        <div className="admin-page__form-group">
          <label className="admin-page__label" htmlFor="location">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="admin-page__input"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., New York City"
            required
          />
        </div>

        {/* Image URL */}
        <div className="admin-page__form-group">
          <label className="admin-page__label" htmlFor="image">
            Image URL *
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="admin-page__input"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="http://localhost:4000/filebucket/image.png"
            required
          />
        </div>

        {/* Short Description */}
        <div className="admin-page__form-group">
          <label className="admin-page__label" htmlFor="short_description">
            Short Description
          </label>
          <textarea
            id="short_description"
            name="short_description"
            className="admin-page__textarea"
            value={formData.short_description}
            onChange={handleInputChange}
            placeholder="A brief description for the card"
            rows="2"
          />
        </div>

        {/* Long Description */}
        <div className="admin-page__form-group">
          <label className="admin-page__label" htmlFor="long_description">
            Long Description
          </label>
          <textarea
            id="long_description"
            name="long_description"
            className="admin-page__textarea"
            value={formData.long_description}
            onChange={handleInputChange}
            placeholder="A detailed description for the animal detail page"
            rows="4"
          />
        </div>

        <button type="submit" className="admin-page__button--submit">
          {isEditMode ? "Update Animal" : "Add Animal"}
        </button>

        {isEditMode && (
          <button
            type="button"
            className="admin-page__button admin-page__button--delete"
            onClick={() => {
              deleteAnimalHandler();
            }}>
            Delete Animal
          </button>
        )}
      </form>
    </main>
  );
}

export default Admin;
