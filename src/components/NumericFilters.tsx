import { SearchParams } from "../types/api";
import Slider from "./Slider";

interface NumericFiltersProps {
  params: SearchParams;
  onParamsChange: (params: SearchParams) => void;
}

export default function NumericFilters({
  params,
  onParamsChange,
}: NumericFiltersProps) {
  const handleChange = (name: keyof SearchParams) => (value: number) => {
    onParamsChange({ ...params, [name]: value });
  };

  const filters = [
    {
      label: "Minimum Review Score",
      name: "review_score" as const,
      min: 0,
      max: 10,
      step: 0.1,
      defaultValue: 0,
    },
    {
      label: "Minimum Review Count",
      name: "review_count" as const,
      min: 0,
      max: 20,
      step: 1,
      defaultValue: 0,
    },
    {
      label: "Minimum IMDB Rating",
      name: "rating" as const,
      min: 0,
      max: 10,
      step: 0.1,
      defaultValue: 0,
    },
  ];

  return (
    <div className="space-y-4">
      {filters.map((filter) => (
        <Slider
          key={filter.name}
          label={filter.label}
          value={params[filter.name] || filter.defaultValue}
          onChange={handleChange(filter.name)}
          min={filter.min}
          max={filter.max}
          step={filter.step}
        />
      ))}
    </div>
  );
}
