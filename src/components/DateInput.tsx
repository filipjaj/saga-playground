import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface DateInputProps {
  label: string;
  name: string;
  value: string;
  daysValue?: string;
  onChange: (name: string, value: string, daysValue?: string) => void;
  useDaysAgo: boolean;
  onToggleMode: () => void;
}

export default function DateInput({
  label,
  name,
  value,
  daysValue,
  onChange,
  useDaysAgo,
  onToggleMode,
}: DateInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'date') {
      onChange(name, e.target.value, undefined);
    } else {
      // For number input, ensure value is positive
      const days = Math.max(0, parseInt(e.target.value) || 0);
      onChange(name, '', days.toString());
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMode}
          className="h-8 px-2"
        >
          {useDaysAgo ? <Calendar className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
        </Button>
      </div>
      
      {useDaysAgo ? (
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            value={daysValue || '0'}
            onChange={handleChange}
            className="flex-1 p-2 border rounded-md bg-background"
            placeholder="Enter days"
          />
          <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
            days ago
          </span>
        </div>
      ) : (
        <input
          type="date"
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-background"
        />
      )}
    </div>
  );
}