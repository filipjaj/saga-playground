"use client";

import { useState } from "react";

interface SwitchProps {
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function Switch({
  label,
  checked = false,
  onCheckedChange,
}: SwitchProps) {
  const toggleSwitch = () => {
    if (onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={toggleSwitch}
        className={`${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
      <div className="ml-3 text-gray-700 font-medium">{label}</div>
    </label>
  );
}
