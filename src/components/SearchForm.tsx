import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { SearchParams } from '../types/api';
import { Button } from './ui/button';
import NumericFilters from './NumericFilters';
import DateInput from './DateInput';

interface SearchFormProps {
  params: SearchParams;
  onParamsChange: (params: SearchParams) => void;
  onReset: () => void;
}

export default function SearchForm({ params, onParamsChange, onReset }: SearchFormProps) {
  const [dateInputModes, setDateInputModes] = useState({
    released: false,
    reviewed: false,
    vod: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onParamsChange({ ...params, [name]: value });
  };

  const handleDateChange = (name: string, value: string, daysValue?: string) => {
    const baseName = name.replace(/_after|_before/, '');
    const suffix = name.includes('_after') ? '_after' : '_before';
    
    if (daysValue !== undefined) {
      // Clear the date value and set days value
      onParamsChange({
        ...params,
        [name]: '',
        [`${baseName}${suffix}_days`]: daysValue
      });
    } else {
      // Clear the days value and set date value
      onParamsChange({
        ...params,
        [name]: value,
        [`${baseName}${suffix}_days`]: undefined
      });
    }
  };

  const toggleDateMode = (field: keyof typeof dateInputModes) => {
    setDateInputModes(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-card-foreground">Search Parameters</h2>
        <Button
          variant="ghost"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Language</label>
          <input
            type="text"
            name="original_language"
            value={params.original_language || ''}
            onChange={handleChange}
            placeholder="en"
            className="w-full p-2 border rounded-md bg-background"
            maxLength={2}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Sort By</label>
          <select
            name="sort"
            value={params.sort || 'strommedato'}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="strommedato">Streaming Release Date</option>
            <option value="votes">IMDb Votes</option>
            <option value="anmelderdato">Review Date</option>
          </select>
        </div>

        {/* Released dates */}
        <DateInput
          label="Released After"
          name="released_after"
          value={params.released_after || ''}
          daysValue={params.released_after_days}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.released}
          onToggleMode={() => toggleDateMode('released')}
        />
        <DateInput
          label="Released Before"
          name="released_before"
          value={params.released_before || ''}
          daysValue={params.released_before_days}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.released}
          onToggleMode={() => toggleDateMode('released')}
        />

        {/* Reviewed dates */}
        <DateInput
          label="Reviewed After"
          name="reviewed_after"
          value={params.reviewed_after || ''}
          daysValue={params.reviewed_after_days}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.reviewed}
          onToggleMode={() => toggleDateMode('reviewed')}
        />
        <DateInput
          label="Reviewed Before"
          name="reviewed_before"
          value={params.reviewed_before || ''}
          daysValue={params.reviewed_before_days}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.reviewed}
          onToggleMode={() => toggleDateMode('reviewed')}
        />

        {/* VOD dates */}
        <DateInput
          label="VOD Release After"
          name="vod_date_after"
          value={params.vod_date_after || ''}
          daysValue={params.vod_date_after_days}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.vod}
          onToggleMode={() => toggleDateMode('vod')}
        />
        <DateInput
          label="VOD Release Before"
          name="vod_date_before"
          value={params.vod_date_before || ''}
          daysValue={params.vod_date_before_days}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.vod}
          onToggleMode={() => toggleDateMode('vod')}
        />
      </div>

      <NumericFilters params={params} onParamsChange={onParamsChange} />
    </div>
  );
}