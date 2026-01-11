"use client";

export function DynamicField({ field, value, onChange }) {
  const {
    id,
    label,
    type,
    allowRange,
    unit,
    options,
    placeholder,
    required
  } = field;

  // -------------------------
  // RANGE HANDLER
  // -------------------------
  if (type === "number" && allowRange) {
    const rangeValue = value ?? {};

    return (
      <div className="field">
        <label>{label}</label>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={rangeValue.min ?? ""}
            onChange={e =>
              onChange({ ...rangeValue, min: e.target.valueAsNumber })
            }
          />

          <input
            type="number"
            placeholder="Max"
            value={rangeValue.max ?? ""}
            onChange={e =>
              onChange({ ...rangeValue, max: e.target.valueAsNumber })
            }
          />

          {unit && (
            <select
              value={rangeValue.unit ?? unit[0]}
              onChange={e =>
                onChange({ ...rangeValue, unit: e.target.value })
              }
            >
              {unit.map(u => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  }

  // -------------------------
  // SIMPLE NUMBER
  // -------------------------
  if (type === "number") {
    return (
      <div className="field">
        <label>{label}</label>
        <input
          type="number"
          value={value ?? ""}
          onChange={e => onChange(e.target.valueAsNumber)}
        />
      </div>
    );
  }

  // -------------------------
  // TEXT / TEXTAREA
  // -------------------------
  if (type === "text" || type === "textarea") {
    const Component = type === "textarea" ? "textarea" : "input";

    return (
      <div className="field">
        <label>{label}</label>
        <Component
          value={value ?? ""}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    );
  }

  // -------------------------
  // SELECT
  // -------------------------
  if (type === "select") {
    return (
      <div className="field">
        <label>{label}</label>
        <select
          value={value ?? ""}
          onChange={e => onChange(e.target.value)}
        >
          <option value="">Select</option>
          {options?.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // -------------------------
  // FILE
  // -------------------------
  if (type === "file") {
    return (
      <div className="field">
        <label>{label}</label>
        <input
          type="file"
          multiple={field.multiple}
          accept={field.accept?.join(",")}
          onChange={e =>
            onChange(Array.from(e.target.files ?? []))
          }
        />
      </div>
    );
  }

  return null;
}
