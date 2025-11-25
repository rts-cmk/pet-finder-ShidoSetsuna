import { useState } from "react";
import { API_BASE_URL } from "../../../config/api";
import CategorySelector from "../../../components/category_selector/category_selector";
import "../admin.scss";

function AdminNew() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [formData, setFormData] = useState({
    breed: "",
    gender: "male",
    location: "",
    image: "",
    short_description: "",
    long_description: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!selectedCategory) {
      setMessage({ text: "Please select or enter a category", type: "error" });
      return;
    }

    // If trying to add a new category, create it first
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

        setMessage({
          text: `Category "${selectedCategory}" created! You can now add animals to it.`,
          type: "success",
        });
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
      // ADD new animal
      const response = await fetch(`${API_BASE_URL}/${selectedCategory}`);
      if (!response.ok) {
        throw new Error("Category does not exist in database");
      }

      const existingAnimals = await response.json();
      const nextId =
        existingAnimals.length > 0
          ? Math.max(...existingAnimals.map((a) => a.id)) + 1
          : 1;

      // Add the new animal
      const newAnimal = {
        id: nextId,
        ...formData,
      };

      const postResponse = await fetch(`${API_BASE_URL}/${selectedCategory}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnimal),
      });

      if (!postResponse.ok) {
        throw new Error("Failed to add animal");
      }

      setMessage({ text: "Animal added successfully!", type: "success" });

      // Reset form
      setFormData({
        breed: "",
        gender: "male",
        location: "",
        image: "",
        short_description: "",
        long_description: "",
      });
    } catch (error) {
      setMessage({
        text: "Error adding animal. Please try again.",
        type: "error",
      });
      console.error("Error:", error);
    }
  };

  return (
    <main className="admin-page__content">
      <h1 className="admin-page__title">Add New Animal</h1>

      {message.text && (
        <div
          className={`admin-page__message admin-page__message--${message.type}`}>
          {message.text}
        </div>
      )}

      <form className="admin-page__form" onSubmit={handleSubmit}>
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          showAddNew={true}
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
          Add Animal
        </button>
      </form>
    </main>
  );
}

export default AdminNew;
