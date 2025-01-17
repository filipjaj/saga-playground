import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MIN_DAYS_AGO, MAX_DAYS_AGO } from '@/features/search/constants';

interface DateFilterProps {
  label: string;
  date?: string;
  daysAgo?: number;
  onDateChange: (value: string | undefined) => void;
  onDaysAgoChange: (value: number | undefined) => void;
  mode: 'date' | 'days_ago';
  onModeChange: (mode: 'date' | 'days_ago') => void;
}

export function DateFilter({
  label,
  date,
  daysAgo,
  onDateChange,
  onDaysAgoChange,
  mode,
  onModeChange,
}: DateFilterProps) {
  const handleModeChange = (newMode: 'date' | 'days_ago') => {
    if (newMode === mode) return;
    
    // Clear both values when switching modes to ensure clean state
    onDateChange(undefined);
    onDaysAgoChange(undefined);
    onModeChange(newMode);
  };

  const handleDateChange = (value: string) => {
    // Only update if the value is valid
    if (value) {
      onDateChange(value);
    } else {
      onDateChange(undefined);
    }
  };

  const handleDaysAgoChange = (value: string) => {
    // Handle empty input
    if (!value) {
      onDaysAgoChange(undefined);
      return;
    }

    // Parse and validate the number
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      onDaysAgoChange(undefined);
      return;
    }

    // Validate range
    if (numValue >= MIN_DAYS_AGO && numValue <= MAX_DAYS_AGO) {
      onDaysAgoChange(numValue);
    }
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      <RadioGroup value={mode} onValueChange={handleModeChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="date" id={`${label}-date`} />
          <Label htmlFor={`${label}-date`}>Specific Date</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="days_ago" id={`${label}-days-ago`} />
          <Label htmlFor={`${label}-days-ago`}>Days Ago</Label>
        </div>
      </RadioGroup>

      {mode === 'date' ? (
        <Input
          type="date"
          value={date || ''}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full"
        />
      ) : (
        <Input
          type="number"
          value={typeof daysAgo === 'number' ? daysAgo.toString() : ''}
          onChange={(e) => handleDaysAgoChange(e.target.value)}
          min={MIN_DAYS_AGO}
          max={MAX_DAYS_AGO}
          className="w-full"
          placeholder="Enter number of days"
        />
      )}
    </div>
  );
}
