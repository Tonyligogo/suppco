import { DynamicField } from "./dynamicField";

export function ProductSpecificFields({
  fields,
  value,
  onChange
}) {
  return (
    <div className="grid gap-4">
      {fields.map(field => (
        <DynamicField
          key={field.id}
          field={field}
          value={value[field.id]}
          onChange={v =>
            onChange(prev => ({ ...prev, [field.id]: v }))
          }
        />
      ))}
    </div>
  );
}
