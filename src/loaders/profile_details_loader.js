import { API_BASE_URL } from "../config/api";

export async function profileDetailsLoader({ params }) {
  // Fetch user profile details using the ID from the URL
  const userResponse = await fetch(`${API_BASE_URL}/users/${params.id}`);
  if (!userResponse.ok) {
    throw new Response("Failed to load profile details", {
      status: userResponse.status,
    });
  }
  const userProfile = await userResponse.json();

  // Fetch all categories to get favorite pets
  const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
  const categories = await categoriesResponse.json();

  // Fetch all animals from all categories
  const animalPromises = categories.map((category) =>
    fetch(`${API_BASE_URL}/${category}`).then((res) => res.json())
  );
  const animalArrays = await Promise.all(animalPromises);
  const allAnimals = animalArrays.flat();

  // Filter animals that are in the user's favorite_pets
  const favoritePets = userProfile.favorite_pets
    ? allAnimals.filter((animal) =>
        userProfile.favorite_pets.includes(String(animal.id))
      )
    : [];

  return { user: userProfile, favoritePets };
}
