import { SearchParams, TVGuide } from "../types/api";

const API_BASE_URL = "https://tvguide.vg.no/backend/api";

export async function fetchMovies(params: SearchParams): Promise<TVGuide> {
  const searchParams = new URLSearchParams();

  // Process date parameters
  const dateFields = [
    ["released_after", "released_after_days"],
    ["released_before", "released_before_days"],
    ["reviewed_after", "reviewed_after_days"],
    ["reviewed_before", "reviewed_before_days"],
    ["vod_date_after", "vod_date_after_days"],
    ["vod_date_before", "vod_date_before_days"],
  ];

  dateFields.forEach(([dateField, daysField]) => {
    if (params[daysField as keyof SearchParams]) {
      const days = parseInt(params[daysField as keyof SearchParams] as string);
      const date = new Date();
      date.setDate(date.getDate() - days);
      searchParams.append(dateField, date.toISOString().split("T")[0]);
    } else if (params[dateField as keyof SearchParams]) {
      searchParams.append(
        dateField,
        params[dateField as keyof SearchParams] as string
      );
    }
  });

  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      !key.includes("_days") && // Skip the days fields
      !dateFields.map(([field]) => field).includes(key) // Skip already processed date fields
    ) {
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
