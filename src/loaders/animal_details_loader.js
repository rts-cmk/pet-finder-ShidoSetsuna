import { API_BASE_URL } from "../config/api";

export async function animalDetailsLoader({ params, request }) {
  const { id, category } = params;

  // If category is provided in params (from route like /animal/:category/:id)
  if (category) {
    const response = await fetch(`${API_BASE_URL}/${category}`);
    const animals = await response.json();
    const animal = animals.find((a) => a.id === parseInt(id));

    if (animal) {
      return { animal, category };
    }
    throw new Response("Animal not found", { status: 404 });
  }

  // If no category in params, check query params (for admin edit page)
  const url = new URL(request.url);
  const queryCategory = url.searchParams.get("category");
  const queryId = url.searchParams.get("animalId") || id;

  if (queryCategory && queryId) {
    const response = await fetch(`${API_BASE_URL}/${queryCategory}`);
    const animals = await response.json();
    const animal = animals.find((a) => a.id === parseInt(queryId));

    if (animal) {
      return { animal, category: queryCategory };
    }
    throw new Response("Animal not found", { status: 404 });
  }

  // Fallback: search through all categories
  const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
  const categories = await categoriesResponse.json();

  for (const cat of categories) {
    const response = await fetch(`${API_BASE_URL}/${cat}`);
    const animals = await response.json();
    const animal = animals.find((a) => a.id === parseInt(queryId || id));

    if (animal) {
      return { animal, category: cat };
    }
  }

  throw new Response("Animal not found", { status: 404 });
}
