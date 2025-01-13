import { DataEntity } from "../types/api";
import { Star, Clock, Calendar, MessageSquare } from "lucide-react";
import { BackendImage } from "./BackendImage";

interface MovieCardProps {
  movie: DataEntity;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const handleClick = () => {
    window.open(`https://saga.vg.no/${movie.slug}`, "_blank");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="aspect-[2/3] relative">
        <BackendImage
          source={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          {movie.title}
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground">
          {/* Release Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Released: {formatDate(movie.releasedAt)}</span>
          </div>

          {/* Review Date */}
          {movie.reviewedAt && (
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Reviewed: {formatDate(movie.reviewedAt)}</span>
            </div>
          )}

          {/* VOD/Streaming Date */}
          {movie.vodDate && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Streaming: {formatDate(movie.vodDate)}</span>
            </div>
          )}

          {/* Rating */}
          {movie.imdbRating && (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>{movie.imdbRating.toFixed(1)}/10</span>
            </div>
          )}

          {/* Language */}
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
              {movie.originalLanguage.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
