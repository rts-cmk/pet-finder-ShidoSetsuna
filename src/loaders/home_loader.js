import { API_BASE_URL, API_ENDPOINTS } from "../config/api";

export async function homeLoader() {
  const [userResponse, dogsResponse] = await Promise.all([
    fetch(API_ENDPOINTS.user),
    fetch(`${API_BASE_URL}/dogs`),
  ]);

  const user = await userResponse.json();
  const dogs = await dogsResponse.json();

  return { user, animals: dogs, category: "dogs" };
}
