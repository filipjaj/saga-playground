import React from 'react';
import { SearchParams } from '@/features/search/types';
import {
  SORT_OPTIONS,
  TYPE_OPTIONS,

  COMMON_LANGUAGES,
  COMMON_GENRES,
  COMMON_PROVIDERS,
  MIN_RATING,
  MAX_RATING,
  
} from '@/features/search/constants';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MultiSelect } from './ui/multi-select';
import { DateFilter } from './ui/date-filter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import Switch from './ui/switch';
import { RotateCcw } from 'lucide-react';

interface SearchFormProps {
  filters: SearchParams;
  onSubmit: (params: SearchParams) => void;
}

export default function SearchForm({
  filters,
  onSubmit,
}: SearchFormProps) {
  const [dateMode, setDateMode] = React.useState<Record<string, 'date' | 'days_ago'>>({
    released_after:  'days_ago',
    released_before: 'days_ago',
    reviewed_after: 'days_ago',
    reviewed_before: 'days_ago',
    vod_date_after: 'days_ago',
    vod_date_before: 'days_ago',
  });

  const handleChange = (key: keyof SearchParams, value: any) => {
    onSubmit({
      ...filters,
      [key]: value,
    });
  };

  const handleMultiSelect = (key: keyof SearchParams) => (values: string[]) => {
    handleChange(key, values.length > 0 ? values.join(',') : undefined);
  };

  const getSelectedValues = (value?: string) => {
    return value ? value.split(',') : [];
  };

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-card-foreground">Search Parameters</h2>
        <Button variant="ghost" onClick={() => onSubmit({})} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Type Selection */}
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={filters?.type || ''} onValueChange={(value) => handleChange('type', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Selection */}
        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select value={filters?.sort || 'aktuelt'} onValueChange={(value) => handleChange('sort', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Providers */}
        <div className="space-y-2">
          <Label>Providers</Label>
          <MultiSelect
            options={COMMON_PROVIDERS}
            selected={getSelectedValues(filters?.providers)}
            onChange={handleMultiSelect('providers')}
            placeholder="Select providers"
          />
        </div>

        {/* Genres */}
        <div className="space-y-2">
          <Label>Genres</Label>
          <MultiSelect
            options={COMMON_GENRES}
            selected={getSelectedValues(filters?.genres)}
            onChange={handleMultiSelect('genres')}
            placeholder="Select genres"
          />
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <Label>Original Language</Label>
          <MultiSelect
            options={COMMON_LANGUAGES}
            selected={getSelectedValues(filters?.original_language)}
            onChange={handleMultiSelect('original_language')}
            placeholder="Select languages"
          />
        </div>

        <div className="space-y-2">
          <Label>Review Count</Label>
          <Input
            type="number"
            value={filters?.review_count || ''}
            onChange={(e) => handleChange('review_count', e.target.value ? Number(e.target.value) : undefined)}
            min={0}
          />
        </div>

        {/* Rating */}
        <div className="space-y-4">
          <Label>Rating</Label>
          <Slider
            value={[filters?.rating || MIN_RATING]}
            onValueChange={([value]) => handleChange('rating', value)}
            min={MIN_RATING}
            max={MAX_RATING}
            step={0.1}
          />
        </div>

        {/* Review Score */}
        <div className="space-y-4">
          <Label>Review Score</Label>
          <Slider
            value={[filters?.review_score || MIN_RATING]}
            onValueChange={([value]) => handleChange('review_score', value)}
            min={MIN_RATING}
            max={MAX_RATING}
            step={0.1}
          />
        </div>
      </div>

      {/* Date Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Date Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DateFilter
            label="Released After"
            date={filters.released_after}
            daysAgo={typeof filters.released_after_days_ago === 'number' ? filters.released_after_days_ago : undefined}
            onDateChange={(value) => handleChange('released_after', value)}
            onDaysAgoChange={(value) => handleChange('released_after_days_ago', value)}
            mode={dateMode.released_after}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, released_after: mode }))}
          />

          <DateFilter
            label="Released Before"
            date={filters.released_before}
            daysAgo={typeof filters.released_before_days_ago === 'number' ? filters.released_before_days_ago : undefined}
            onDateChange={(value) => handleChange('released_before', value)}
            onDaysAgoChange={(value) => handleChange('released_before_days_ago', value)}
            mode={dateMode.released_before}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, released_before: mode }))}
          />

          <DateFilter
            label="Reviewed After"
            date={filters.reviewed_after}
            daysAgo={typeof filters.reviewed_after_days_ago === 'number' ? filters.reviewed_after_days_ago : undefined}
            onDateChange={(value) => handleChange('reviewed_after', value)}
            onDaysAgoChange={(value) => handleChange('reviewed_after_days_ago', value)}
            mode={dateMode.reviewed_after}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, reviewed_after: mode }))}
          />

          <DateFilter
            label="Reviewed Before"
            date={filters.reviewed_before}
            daysAgo={typeof filters.reviewed_before_days_ago === 'number' ? filters.reviewed_before_days_ago : undefined}
            onDateChange={(value) => handleChange('reviewed_before', value)}
            onDaysAgoChange={(value) => handleChange('reviewed_before_days_ago', value)}
            mode={dateMode.reviewed_before}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, reviewed_before: mode }))}
          />

          <DateFilter
            label="VOD Date After"
            date={filters.vod_date_after}
            daysAgo={typeof filters.vod_date_after_days_ago === 'number' ? filters.vod_date_after_days_ago : undefined}
            onDateChange={(value) => handleChange('vod_date_after', value)}
            onDaysAgoChange={(value) => handleChange('vod_date_after_days_ago', value)}
            mode={dateMode.vod_date_after}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, vod_date_after: mode }))}
          />

          <DateFilter
            label="VOD Date Before"
            date={filters.vod_date_before}
            daysAgo={typeof filters.vod_date_before_days_ago === 'number' ? filters.vod_date_before_days_ago : undefined}
            onDateChange={(value) => handleChange('vod_date_before', value)}
            onDaysAgoChange={(value) => handleChange('vod_date_before_days_ago', value)}
            mode={dateMode.vod_date_before}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, vod_date_before: mode }))}
          />
        </div>
      </div>

      {/* Relevant Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          label="Relevant"
          checked={filters.relevant}
          onCheckedChange={(checked) => handleChange('relevant', checked)}
        />
        <Label>Relevant</Label>
      </div>
    </form>
  );
}
