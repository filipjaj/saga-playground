import React, { useState } from "react";
import { RotateCcw } from "lucide-react";
import { SearchParams } from "../types/api";
import { Button } from "./ui/button";
import NumericFilters from "./NumericFilters";
import DateInput from "./DateInput";
import Switch from "./ui/switch";
import FilterDropdowns from "./FilterDropdowns";

interface SearchFormProps {
  params: SearchParams;
  onParamsChange: (params: SearchParams) => void;
  onReset: () => void;
}

export default function SearchForm({
  params,
  onParamsChange,
  onReset,
}: SearchFormProps) {
  const [dateInputModes, setDateInputModes] = useState({
    released: true,
    reviewed: true,
    vod: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onParamsChange({ ...params, [name]: value });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-card-foreground">
          Search Parameters
        </h2>
        <Button
          variant="ghost"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Language
            </label>
            <input
              type="text"
              name="original_language"
              value={params.original_language || ""}
              onChange={handleChange}
              placeholder="en"
              className="w-full p-2 border rounded-md bg-background"
              maxLength={2}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Sort By
            </label>
            <select
              name="sort"
              value={params.sort || "strommedato"}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-background"
            >
              <option value="strommedato">Streaming Release Date</option>
              <option value="votes">IMDb Votes</option>
              <option value="anmelderdato">Review Date</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dato-filtre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DateInput
              label="Released After"
              name="released_after"
              value={params.released_after || ""}
              onChange={(name, value) => handleDateChange(name, value)}
            />

            <DateInput
              label="Released Before"
              name="released_before"
              value={params.released_before || ""}
              onChange={(name, value) => handleDateChange(name, value)}
            />

            <DateInput
              label="Reviewed After"
              name="reviewed_after"
              value={params.reviewed_after || ""}
              onChange={(name, value) => handleDateChange(name, value)}
            />

            <DateInput
              label="Reviewed Before"
              name="reviewed_before"
              value={params.reviewed_before || ""}
              onChange={(name, value) => handleDateChange(name, value)}
            />

            <DateInput
              label="VOD Date After"
              name="vod_date_after"
              value={params.vod_date_after || ""}
              onChange={(name, value) => handleDateChange(name, value)}
            />

            <DateInput
              label="VOD Date Before"
              name="vod_date_before"
              value={params.vod_date_before || ""}
              onChange={(name, value) => handleDateChange(name, value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Days ago filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Released days ago
              </label>
              <input
                type="number"
                name="released_days_ago"
                value={params.released_days_ago || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-background"
                min="0"
                max="999999"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Reviewed days ago
              </label>
              <input
                type="number"
                name="reviewed_days_ago"
                value={params.reviewed_days_ago || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-background"
                min="0"
                max="999999"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                VOD days ago
              </label>
              <input
                type="number"
                name="vod_date_days_ago"
                value={params.vod_date_days_ago || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-background"
                min="0"
                max="999999"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Relevant
          </label>
          <Switch
            label="Relevant"
            onChange={(isChecked) =>
              onParamsChange({ ...params, relevant: isChecked ? 1 : 0 })
            }
          />
        </div>

        <NumericFilters params={params} onParamsChange={onParamsChange} />

        <FilterDropdowns
          type={params.type || ""}
          genres={params.genres || ""}
          onTypeChange={(value) => onParamsChange({ ...params, type: value })}
          onGenresChange={(value) =>
            onParamsChange({ ...params, genres: value })
          }
        />
      </div>
    </div>
  );
}
