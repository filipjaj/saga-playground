import { SearchParams, TVGuide } from "../types/api";

export async function fetchMovies(params: SearchParams, baseUrl: string): Promise<TVGuide> {
  const searchParams = new URLSearchParams();

  // Process date parameters

  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${baseUrl}/titles?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}
