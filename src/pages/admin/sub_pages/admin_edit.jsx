import { useState } from "react";
import { useLoaderData } from "react-router";
import { API_BASE_URL } from "../../../config/api";
import CategorySelector from "../../../components/category_selector/category_selector";
import "../admin.scss";

function AdminEdit() {
  const { animal, category } = useLoaderData();
  const [editingAnimal] = useState(animal);
  const [originalCategory] = useState(category);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [formData, setFormData] = useState({
    breed: animal.breed || "",
    gender: animal.gender || "male",
    location: animal.location || "",
    image: animal.image || "",
    short_description: animal.short_description || "",
    long_description: animal.long_description || "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category, isNew) => {
    setSelectedCategory(category);
    setIsNewCategory(isNew);
  };

  const deleteAnimalHandler = async () => {
    if (!editingAnimal) return;
    try {
      // Delete the animal from its original category
      await fetch(`${API_BASE_URL}/${originalCategory}/${editingAnimal.id}`, {
        method: "DELETE",
      });

      // Check if category is now empty, if it is, delete the category
      const categoryResponse = await fetch(
        `${API_BASE_URL}/${originalCategory}`
      );
      const categoryAnimals = await categoryResponse.json();

      if (categoryAnimals.length === 0) {
        await fetch(`${API_BASE_URL}/api/delete-category/${originalCategory}`, {
          method: "DELETE",
        });
      }

      setMessage({ text: "Animal deleted successfully!", type: "success" });
    } catch (error) {
      console.error("Error deleting animal:", error);
      setMessage({ text: "Error deleting animal", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!selectedCategory) {
      setMessage({ text: "Please select a category", type: "error" });
      return;
    }

    // If trying to use a new category, create it first
    if (isNewCategory) {
      try {
        const createCategoryResponse = await fetch(
          `${API_BASE_URL}/api/create-category`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryName: selectedCategory }),
          }
        );

        if (!createCategoryResponse.ok) {
          const error = await createCategoryResponse.json();
          setMessage({
            text: error.error || "Failed to create category",
            type: "error",
          });
          return;
        }

        setIsNewCategory(false); // Mark as no longer new
      } catch (error) {
        setMessage({
          text: "Failed to create category. Make sure the server.js is running.",
          type: "error",
        });
        return;
      }
    }

    // Validate required fields
    if (!formData.breed || !formData.location || !formData.image) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      return;
    }

    try {
      // UPDATE existing animal
      const updatedAnimal = {
        ...editingAnimal,
        ...formData,
      };

      // Check if category has changed
      if (selectedCategory !== originalCategory) {
        // Delete from old category
        await fetch(`${API_BASE_URL}/${originalCategory}/${editingAnimal.id}`, {
          method: "DELETE",
        });

        // Check if old category is now empty, if so delete it
        const oldCategoryResponse = await fetch(
          `${API_BASE_URL}/${originalCategory}`
        );
        const oldCategoryAnimals = await oldCategoryResponse.json();

        if (oldCategoryAnimals.length === 0) {
          await fetch(
            `${API_BASE_URL}/api/delete-category/${originalCategory}`,
            {
              method: "DELETE",
            }
          );
        }

        // Add to new category
        await fetch(`${API_BASE_URL}/${selectedCategory}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAnimal),
        });
      } else {
        // Same category, just update
        await fetch(`${API_BASE_URL}/${selectedCategory}/${editingAnimal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAnimal),
        });
      }

      setMessage({ text: "Animal updated successfully!", type: "success" });
    } catch (error) {
      setMessage({
        text: "Error updating animal. Please try again.",
        type: "error",
      });
      console.error("Error:", error);
    }
  };

  return (
    <main className="admin-page__content">
      <h1 className="admin-page__title">Edit Animal</h1>
      {message.text && (
        <div
          className={`admin-page__message admin-page__message--${message.type}`}>
          {message.text}
        </div>
      )}

      <form className="admin-page__form" onSubmit={handleSubmit}>
        {/* Category Selection */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={(category, isNew) => {
            setSelectedCategory(category);
            setIsNewCategory(isNew);
          }}
        />

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

        <button
          type="submit"
          className="admin-page__button admin-page__button--submit">
          Update Animal
        </button>

        <button
          type="button"
          className="admin-page__button admin-page__button--delete"
          onClick={() => {
            deleteAnimalHandler();
          }}>
          Delete Animal
        </button>
      </form>
    </main>
  );
}

export default AdminEdit;
