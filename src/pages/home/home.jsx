import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { API_BASE_URL } from "../../config/api";
import TopBar from "../../components/top_bar/top_bar";
import TagSelector from "../../components/tag_selector/tag_selector";
import AnimalCard from "../../components/animal_card/animal_card";
import "./home.scss";

function Home() {
  const loaderData = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState(loaderData.category);
  const [animals, setAnimals] = useState(loaderData.animals);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${selectedCategory}`);
        const data = await response.json();
        setAnimals(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFavouriteToggle = (animalId, isFavourite) => {
    // TODO: Implement favourite logic (localStorage, API, etc.)
    console.log(`Animal ${animalId} favourite status:`, isFavourite);
  };

  return (
    <div className="home_container">
      <header>
        <TopBar user={loaderData.user} />
        <TagSelector onCategoryChange={handleCategoryChange} />
      </header>
      <main className="home">
        <section className="home__animals">
          {loading && <p className="home__message">Loading animals...</p>}

          {error && (
            <p className="home__message home__message--error">
              Error loading animals
            </p>
          )}

          {!loading && !error && animals && animals.length === 0 && (
            <p className="home__message">No animals found in this category.</p>
          )}

          {!loading && !error && animals && animals.length > 0 && (
            <div className="home__cards">
              {animals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  category={selectedCategory}
                  onFavouriteToggle={handleFavouriteToggle}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
