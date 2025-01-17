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
  params: SearchParams;
  onParamsChange: (params: SearchParams) => void;
  onReset: () => void;
}

export default function SearchForm({
  params,
  onParamsChange,
  onReset,
}: SearchFormProps) {
  const [dateMode, setDateMode] = React.useState<Record<string, 'date' | 'days_ago'>>({
    released_after:  'days_ago',
    released_before: 'days_ago',
    reviewed_after: 'days_ago',
    reviewed_before: 'days_ago',
    vod_date_after: 'days_ago',
    vod_date_before: 'days_ago',
  });

  const handleChange = (
    name: keyof SearchParams,
    value: string | number | boolean | undefined
  ) => {
    onParamsChange({ ...params, [name]: value });
  };

  const handleMultiSelect = (name: keyof SearchParams) => (values: string[]) => {
    handleChange(name, values.join(','));
  };

  const getSelectedValues = (value: string | undefined): string[] => {
    return value ? value.split(',').filter(Boolean) : [];
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-card-foreground">Search Parameters</h2>
        <Button variant="ghost" onClick={onReset} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Type Selection */}
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={params.type || ''} onValueChange={(value) => handleChange('type', value || undefined)}>
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
          <Select value={params.sort || 'aktuelt'} onValueChange={(value) => handleChange('sort', value)}>
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
            selected={getSelectedValues(params.providers)}
            onChange={handleMultiSelect('providers')}
            placeholder="Select providers"
          />
        </div>

        {/* Genres */}
        <div className="space-y-2">
          <Label>Genres</Label>
          <MultiSelect
            options={COMMON_GENRES}
            selected={getSelectedValues(params.genres)}
            onChange={handleMultiSelect('genres')}
            placeholder="Select genres"
          />
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <Label>Original Language</Label>
          <MultiSelect
            options={COMMON_LANGUAGES}
            selected={getSelectedValues(params.original_language)}
            onChange={handleMultiSelect('original_language')}
            placeholder="Select languages"
          />
        </div>


        <div className="space-y-2">
          <Label>Review Count</Label>
          <Input
            type="number"
            value={params.review_count || ''}
            onChange={(e) => handleChange('review_count', e.target.value ? Number(e.target.value) : undefined)}
            min={0}
          />
        </div>

        {/* Rating */}
        <div className="space-y-4">
          <Label>Rating</Label>
          <Slider
            value={[params.rating || MIN_RATING]}
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
            value={[params.review_score || MIN_RATING]}
            onValueChange={([value]) => handleChange('review_score', value)}
            min={MIN_RATING}
            max={MAX_RATING}
            step={0.1}
          />
        </div>

        {/* Review Count */}
  
      </div>

      {/* Date Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Date Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DateFilter
            label="Released After"
            date={params.released_after}
            daysAgo={typeof params.released_after_days_ago === 'number' ? params.released_after_days_ago : undefined}
            onDateChange={(value) => handleChange('released_after', value)}
            onDaysAgoChange={(value) => handleChange('released_after_days_ago', value)}
            mode={dateMode.released_after}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, released_after: mode }))}
          />

          <DateFilter
            label="Released Before"
            date={params.released_before}
            daysAgo={typeof params.released_before_days_ago === 'number' ? params.released_before_days_ago : undefined}
            onDateChange={(value) => handleChange('released_before', value)}
            onDaysAgoChange={(value) => handleChange('released_before_days_ago', value)}
            mode={dateMode.released_before}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, released_before: mode }))}
          />

          <DateFilter
            label="Reviewed After"
            date={params.reviewed_after}
            daysAgo={typeof params.reviewed_after_days_ago === 'number' ? params.reviewed_after_days_ago : undefined}
            onDateChange={(value) => handleChange('reviewed_after', value)}
            onDaysAgoChange={(value) => handleChange('reviewed_after_days_ago', value)}
            mode={dateMode.reviewed_after}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, reviewed_after: mode }))}
          />

          <DateFilter
            label="Reviewed Before"
            date={params.reviewed_before}
            daysAgo={typeof params.reviewed_before_days_ago === 'number' ? params.reviewed_before_days_ago : undefined}
            onDateChange={(value) => handleChange('reviewed_before', value)}
            onDaysAgoChange={(value) => handleChange('reviewed_before_days_ago', value)}
            mode={dateMode.reviewed_before}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, reviewed_before: mode }))}
          />

          <DateFilter
            label="VOD Date After"
            date={params.vod_date_after}
            daysAgo={typeof params.vod_date_after_days_ago === 'number' ? params.vod_date_after_days_ago : undefined}
            onDateChange={(value) => handleChange('vod_date_after', value)}
            onDaysAgoChange={(value) => handleChange('vod_date_after_days_ago', value)}
            mode={dateMode.vod_date_after}
            onModeChange={(mode) => setDateMode(prev => ({ ...prev, vod_date_after: mode }))}
          />

          <DateFilter
            label="VOD Date Before"
            date={params.vod_date_before}
            daysAgo={typeof params.vod_date_before_days_ago === 'number' ? params.vod_date_before_days_ago : undefined}
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
          checked={params.relevant}
          onCheckedChange={(checked) => handleChange('relevant', checked)}
        />
        <Label>Relevant</Label>
      </div>
    </div>
  );
}
