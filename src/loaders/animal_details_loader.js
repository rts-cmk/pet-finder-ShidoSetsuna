import { API_BASE_URL } from "../config/api";

export async function animalDetailsLoader({ params }) {
  const { id } = params;

  // Fetch all categories to find the animal
  const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
  const categories = await categoriesResponse.json();

  // Search through each category to find the animal
  for (const category of categories) {
    const response = await fetch(`${API_BASE_URL}/${category}`);
    const animals = await response.json();
    const animal = animals.find((a) => a.id === parseInt(id));

    if (animal) {
      return { animal, category };
    }
  }

  throw new Response("Animal not found", { status: 404 });
}
