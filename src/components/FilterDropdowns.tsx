interface FilterDropdownsProps {
  type: "filmer" | "serier" | undefined;
  genres: string;
  onTypeChange: (value: "filmer" | "serier" | undefined) => void;
  onGenresChange: (value: string) => void;
}

const types = [
  { value: undefined, label: "Alle typer" },
  { value: "filmer", label: "Filmer" },
  { value: "serier", label: "Serier" },
];

const genreOptions = [
  { value: "drama", label: "Drama" },
  { value: "komedie", label: "Komedie" },
  { value: "thriller", label: "Thriller" },
  { value: "action", label: "Action" },
  { value: "eventyr", label: "Eventyr" },
  { value: "sci-fi", label: "Sci-fi" },
  { value: "animasjon", label: "Animasjon" },
  { value: "barn-og-familie", label: "Barn og familie" },
  { value: "romantikk", label: "Romantikk" },
  { value: "fantasy", label: "Fantasy" },
  { value: "western", label: "Western" },
  { value: "musikal", label: "Musikal" },
  { value: "skrekk", label: "Skrekk" },
  { value: "dokumentar", label: "Dokumentar" },
  { value: "reality", label: "Reality" },
  { value: "talkshow", label: "Talkshow" },
  { value: "nyheter", label: "Nyheter" },
  { value: "sport", label: "Sport" },
];

export default function FilterDropdowns({
  type,
  genres,
  onTypeChange,
  onGenresChange,
}: FilterDropdownsProps) {
  const selectedGenres = genres ? genres.split(",") : [];

  const handleGenreChange = (genreValue: string) => {
    const newSelectedGenres = selectedGenres.includes(genreValue)
      ? selectedGenres.filter((g) => g !== genreValue)
      : [...selectedGenres, genreValue];
    onGenresChange(newSelectedGenres.join(","));
  };

  return (
    <div className="flex gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as typeof type)}
          className="w-[180px] p-2 border rounded-md bg-background"
        >
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Sjangere
        </label>
        <div className="border rounded-md bg-background p-2 w-[280px] max-h-[300px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {genreOptions.map((genre) => (
              <label
                key={genre.value}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.value)}
                  onChange={() => handleGenreChange(genre.value)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{genre.label}</span>
              </label>
            ))}
          </div>
        </div>
        {selectedGenres.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {selectedGenres.length} valgt
            </span>
            <button
              onClick={() => onGenresChange("")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Nullstill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
