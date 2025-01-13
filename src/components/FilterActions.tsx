import React from 'react';
import { Share2, X } from 'lucide-react';
import { Button } from './ui/button';
import { copyUrlToClipboard } from '../utils/url';
import { useToast } from './ui/use-toast';

interface FilterActionsProps {
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function FilterActions({ onClearFilters, hasActiveFilters }: FilterActionsProps) {
  const { toast } = useToast();

  const handleCopyUrl = async () => {
    try {
      await copyUrlToClipboard();
      toast({
        title: 'URL Copied',
        description: 'Filter URL has been copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy URL to clipboard',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyUrl}
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share Filters
      </Button>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear All
        </Button>
      )}
    </div>
  );
}