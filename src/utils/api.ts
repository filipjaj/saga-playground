import { SearchParams, TVGuide } from "../types/api";

const API_BASE_URL = "https://tvguide.vg.no/backend/api";

export async function fetchMovies(params: SearchParams): Promise<TVGuide> {
  const searchParams = new URLSearchParams();

  // Process date parameters

  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${API_BASE_URL}/titles?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}
