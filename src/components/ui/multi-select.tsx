import React from 'react';
import { FilterOption } from '@/features/search/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';

interface MultiSelectProps {
  options: FilterOption[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  emptyMessage = "No items found.",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Reset search when dropdown closes
  React.useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    const searchLower = search.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(searchLower)
    );
  }, [options, search]);

  const selectedLabels = React.useMemo(() => {
    if (selected.length === 0) return [];
    return selected.map(value => {
      const option = options.find(opt => opt.value === value);
      return option?.label || value;
    });
  }, [selected, options]);

  const toggleOption = React.useCallback((value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  }, [selected, onChange]);

  return (
    <div className="relative space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {selected.length === 0 ? placeholder : `${selected.length} selected`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2" align="start">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
                      isSelected && "bg-accent"
                    )}
                  >
                    <div className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border",
                      isSelected ? "bg-primary border-primary text-primary-foreground" : "border-primary"
                    )}>
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="truncate">{option.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <Badge key={value} variant="secondary" className="text-sm">
                {option?.label || value}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none hover:bg-muted"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleOption(value);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
