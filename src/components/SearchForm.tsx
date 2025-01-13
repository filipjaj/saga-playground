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
    released: true,
    reviewed: true,
    vod: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onParamsChange({ ...params, [name]: value });
  };

  const handleMultiSelect = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    onParamsChange({ ...params, [name]: values });
  };

  const handleDateChange = (name: string, value: string, daysValue?: string) => {
    const baseName = name.replace(/_after|_before/, '');
    const suffix = name.includes('_after') ? '_after' : '_before';
    
    if (daysValue !== undefined) {
      onParamsChange({
        ...params,
        [name]: '',
        [`${baseName}${suffix}_days`]: daysValue
      });
    } else {
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
        {/* Content Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Content Type</label>
          <select
            name="type"
            value={params.type || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">All Types</option>
            <option value="filmer">Movies</option>
            <option value="serier">TV Series</option>
          </select>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Sort By</label>
          <select
            name="sort"
            value={params.sort || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="aktuelt">Current</option>
            <option value="populaert">Popular</option>
            <option value="populaert_nytt">Popular New</option>
            <option value="kommende">Upcoming</option>
            <option value="utgivelsesdato">Release Date</option>
            <option value="rating">Rating</option>
            <option value="strommedato">Streaming Date</option>
            <option value="votes">Votes</option>
            <option value="anmelderdato">Review Date</option>
          </select>
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Original Language</label>
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
          <label className="text-sm font-medium text-muted-foreground">Review Language</label>
          <input
            type="text"
            name="review_language"
            value={params.review_language || ''}
            onChange={handleChange}
            placeholder="no"
            className="w-full p-2 border rounded-md bg-background"
            maxLength={2}
          />
        </div>

        {/* Relevant */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Show Relevant Only</label>
          <select
            name="relevant"
            value={params.relevant?.toString() || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">All</option>
            <option value="true">Relevant Only</option>
            <option value="false">Include Non-relevant</option>
          </select>
        </div>

        {/* Date Inputs */}
        <DateInput
          label="Released After"
          name="released_after"
          value={params.released_after || ''}
          daysValue={params.released_days_ago}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.released}
          onToggleMode={() => toggleDateMode('released')}
        />

        <DateInput
          label="Released Before"
          name="released_before"
          value={params.released_before || ''}
          daysValue={params.released_days_ago}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.released}
          onToggleMode={() => toggleDateMode('released')}
        />

        <DateInput
          label="Reviewed After"
          name="reviewed_after"
          value={params.reviewed_after || ''}
          daysValue={params.reviewed_days_ago}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.reviewed}
          onToggleMode={() => toggleDateMode('reviewed')}
        />

        <DateInput
          label="Reviewed Before"
          name="reviewed_before"
          value={params.reviewed_before || ''}
          daysValue={params.reviewed_days_ago}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.reviewed}
          onToggleMode={() => toggleDateMode('reviewed')}
        />

        <DateInput
          label="VOD Release After"
          name="vod_date_after"
          value={params.vod_date_after || ''}
          daysValue={params.vod_date_days_ago}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.vod}
          onToggleMode={() => toggleDateMode('vod')}
        />

        <DateInput
          label="VOD Release Before"
          name="vod_date_before"
          value={params.vod_date_before || ''}
          daysValue={params.vod_date_days_ago}
          onChange={handleDateChange}
          useDaysAgo={dateInputModes.vod}
          onToggleMode={() => toggleDateMode('vod')}
        />
      </div>

      {/* Numeric Filters */}
      <NumericFilters params={params} onParamsChange={onParamsChange} />
    </div>
  );
}