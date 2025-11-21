import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/api";
import AnimalCard from "../../components/animal_card/animal_card";
import "./favourites.scss";

function Favourites() {
  const [favouriteAnimals, setFavouriteAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get favourite IDs from localStorage
        const favouriteIds = JSON.parse(
          localStorage.getItem("favourites") || "[]"
        );

        if (favouriteIds.length === 0) {
          setFavouriteAnimals([]);
          setLoading(false);
          return;
        }

        // Fetch all categories
        const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
        const categories = await categoriesResponse.json();

        // Fetch all animals from all categories
        const allAnimalsPromises = categories.map((category) =>
          fetch(`${API_BASE_URL}/${category}`).then((res) => res.json())
        );
        const allAnimalsArrays = await Promise.all(allAnimalsPromises);
        const allAnimals = allAnimalsArrays.flat();

        // Filter for favourited animals
        const favourited = allAnimals.filter((animal) =>
          favouriteIds.includes(animal.id)
        );

        setFavouriteAnimals(favourited);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handleFavouriteToggle = (animalId, isFavourite) => {
    // Update localStorage
    const favouriteIds = JSON.parse(localStorage.getItem("favourites") || "[]");

    let updatedIds;
    if (isFavourite) {
      updatedIds = [...favouriteIds, animalId];
    } else {
      updatedIds = favouriteIds.filter((id) => id !== animalId);
      // Remove from displayed list
      setFavouriteAnimals((prev) =>
        prev.filter((animal) => animal.id !== animalId)
      );
    }

    localStorage.setItem("favourites", JSON.stringify(updatedIds));
  };

  return (
    <main className="favourites">
      <h1 className="favourites__title">My Favourites</h1>

      {loading && <p className="favourites__message">Loading favourites...</p>}

      {error && (
        <p className="favourites__message favourites__message--error">
          Error loading favourites
        </p>
      )}

      {!loading && !error && favouriteAnimals.length === 0 && (
        <p className="favourites__message">No favourite animals yet!</p>
      )}

      {!loading && !error && favouriteAnimals.length > 0 && (
        <div className="favourites__cards">
          {favouriteAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onFavouriteToggle={handleFavouriteToggle}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favourites;
