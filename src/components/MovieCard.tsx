import { DataEntity } from "../types/api";
import { Star, Clock, Globe } from "lucide-react";
import { BackendImage } from "./BackendImage";

interface MovieCardProps {
  movie: DataEntity;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="aspect-[2/3] relative">
        <BackendImage
          source={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          {movie.title}
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(movie.releasedAt).getFullYear()}</span>
          </div>
          {movie.imdbRating && (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>{movie.imdbRating.toFixed(1)}/10</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>{movie.originalLanguage.toUpperCase()}</span>
          </div>
          {movie.streamables && movie.streamables.length > 0 && (
            <div className="mt-3">
              <p className="text-xs mb-1">Available on:</p>
              <div className="flex flex-wrap gap-2">
                {movie.streamables.map((platform) => (
                  <span
                    key={platform.id}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {platform.provider.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
