import { ChevronDown, type LucideIcon } from "lucide-react";

type FieldProps = {
  label: string;
  icon?: LucideIcon;
  select?: boolean;
  children: React.ReactNode;
};

export default function Field({
  label,
  icon: Icon,
  select = false,
  children,
}: FieldProps) {
  return (
    <label className="block min-w-0">
      <span className="field-label">{label}</span>

      <span
        className="field-control"
        data-icon={Icon ? "" : undefined}
        data-select={select ? "" : undefined}
      >
        {Icon && (
          <Icon
            size={16}
            aria-hidden="true"
            className="field-icon field-icon-start"
          />
        )}
        {children}
        {select && (
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="field-icon field-icon-end"
          />
        )}
      </span>
    </label>
  );
}
