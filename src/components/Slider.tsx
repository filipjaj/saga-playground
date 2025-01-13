import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
}

export default function Slider({ value, onChange, min, max, step, label }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}