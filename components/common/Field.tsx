import { ChevronDown, type LucideIcon } from "lucide-react";

type FieldProps = {
  label: string;
  icon?: LucideIcon;
  iconClassName?: string;
  select?: boolean;
  error?: string;
  children: React.ReactNode;
};

export default function Field({
  label,
  icon: Icon,
  iconClassName = "",
  select = false,
  error,
  children,
}: FieldProps) {
  return (
    <label className="block min-w-0">
      <span className="field-label">{label}</span>

      <span
        className="field-control"
        data-icon={Icon ? "" : undefined}
        data-select={select ? "" : undefined}
        data-invalid={error ? "" : undefined}
      >
        {Icon && (
          <Icon
            size={16}
            aria-hidden="true"
            className={`field-icon field-icon-start ${iconClassName}`}
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

      {error && (
        <span role="alert" className="field-error">
          {error}
        </span>
      )}
    </label>
  );
}
