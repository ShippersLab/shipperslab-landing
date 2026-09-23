type ChoiceOption<T extends string> = {
  value: T;
  label: string;
};

type ChoiceGroupProps<T extends string> = {
  legend: string;
  name: string;
  type: "checkbox" | "radio";
  options: ChoiceOption<T>[];
  isSelected: (value: T) => boolean;
  onSelect: (value: T) => void;
};

export function ChoiceGroup<T extends string>({
  legend,
  name,
  type,
  options,
  isSelected,
  onSelect,
}: ChoiceGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-full border border-border bg-paper px-4 py-2 text-sm text-muted transition-colors duration-200 select-none hover:border-ink hover:text-ink has-checked:border-accent has-checked:bg-accent has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
          >
            <input
              type={type}
              name={name}
              value={option.value}
              checked={isSelected(option.value)}
              onChange={() => onSelect(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
