"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

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
      <div className="space-y-2">
        <Label>{label}</Label>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={rangeValue.min ?? ""}
            onChange={e =>
              onChange({ ...rangeValue, min: e.target.valueAsNumber })
            }
          />

          <Input
            type="number"
            placeholder="Max"
            value={rangeValue.max ?? ""}
            onChange={e =>
              onChange({ ...rangeValue, max: e.target.valueAsNumber })
            }
          />

          {unit && (
            <Select
              value={rangeValue.unit ?? unit[0]}
              onValueChange={e =>
                onChange({ ...rangeValue, unit: e.target.value })
              }
            >
              <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
              <SelectContent>
                          {unit.map(u => (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          ))}
                        </SelectContent>
            </Select>
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
      <div className="space-y-2">
        <Label>{label}</Label>
        <Input
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
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {type === "text" ? 
        <Input
          value={value ?? ""}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
         :
         <Textarea
        placeholder={placeholder}
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
      />
         }
      </div>
    );
  }

  // -------------------------
  // SELECT
  // -------------------------
  if (type === "select") {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Select
          value={value ?? ""}
          onValueChange={value => onChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {options?.map(o => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // -------------------------
  // FILE
  // -------------------------
  if (type === "file") {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Input
          type="file"
          accept={field.accept?.join(",")}
          onChange={e =>
            onChange(e.target.files?.[0] ?? null)
          }
        />
      </div>
    );
  }

  return null;
}
