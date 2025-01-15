interface DateInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

export default function DateInput({
  label,
  name,
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full p-2 border rounded-md bg-background"
      />
    </div>
  );
}
